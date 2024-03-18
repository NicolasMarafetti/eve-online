import { EveApiMarketHistoryResponse, Order } from "@/types/eve_api";
import { prisma } from "./prisma";
import { get, isArray } from "lodash";

const getAveragePriceFromHistory = (history: EveApiMarketHistoryResponse[]): number => {
    let totalVolume: number = 0;
    let totalPrice: number = 0;
    let averagePrice: number;

    for (let i = 0; i < history.length; i++) {
        totalVolume += history[i].volume;
        totalPrice += history[i].volume * history[i].average;
    }

    averagePrice = totalVolume ? totalPrice / totalVolume : 0;

    return averagePrice;
}

/**
 * 
 * @param history: the history of the item. Days without volume are not included in the data.
 * @returns 
 */
const getAverageVolumePerDayFromHistory = (history: EveApiMarketHistoryResponse[]): number => {
    if (history.length === 0) return 0;

    // I search
    try {
        const dates = history.map(h => new Date(h.date).getTime());
        const minDate = Math.min(...dates);
        const totalDays = (new Date().getTime() - minDate) / (1000 * 60 * 60 * 24);

        let totalVolume: number = 0;
        let averageVolumePerDay: number;

        for (let i = 0; i < history.length; i++) {
            totalVolume += history[i].volume;
        }

        averageVolumePerDay = totalVolume / totalDays;

        return averageVolumePerDay;
    } catch (error) {
        console.error(error);
        console.info("history: ", history);
        throw error;
    }
}

const getHighestBuyPrice = (orders: Order[]): number => {
    let highestBuyPrice: number = 0;

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].is_buy_order && orders[i].price > highestBuyPrice) {
            highestBuyPrice = orders[i].price;
        }
    }

    return highestBuyPrice;
}

const getLowestSellPrice = (orders: Order[]): null | number => {
    let lowestSellPrice: null | number = null;

    for (let i = 0; i < orders.length; i++) {
        if (!lowestSellPrice || !orders[i].is_buy_order && orders[i].price < lowestSellPrice) {
            lowestSellPrice = orders[i].price;
        }
    }

    return lowestSellPrice;
}

const getItemHistoryPricesFromApi = async (itemApiId: number, regionApiId: number): Promise<EveApiMarketHistoryResponse[] | { error: string }> => {
    try {
        const responseRaw = await fetch(`https://esi.evetech.net/latest/markets/${regionApiId}/history/?datasource=tranquility&type_id=${itemApiId}`);
        const response = await responseRaw.json();
        if (!isArray(response)) {
            return response;
        }
        return response;
    } catch (error) {
        console.error("getItemHistoryPricesFromApi failed");
        console.error("url called: ", `https://esi.evetech.net/latest/markets/${regionApiId}/history/?datasource=tranquility&type_id=${itemApiId}`);
        console.error(error);
        return [];
    }
}

const getItemNameFromApi = async (itemApiId: number): Promise<string> => {
    try {
        const response = await fetch(`https://esi.evetech.net/latest/universe/types/${itemApiId}/?datasource=tranquility`);
        const responseJson = await response.json();
        return responseJson.name;
    } catch (error) {
        console.error("getItemNameFromApi failed");
        console.error(error);
        return "";
    }
}

export const getItemPricesFromApi = async (itemApiId: number, regionId: string): Promise<void> => {
    try {
        let item = await prisma.item.findFirst({
            where: {
                eve_api_item_id: itemApiId
            }
        });
        const region = await prisma.region.findFirst({
            where: {
                id: regionId
            }
        });
        if (!region) {
            console.error("Region not found");
            console.error("regionId: ", regionId);
            return;
        }
        if (!item) {
            const itemName = await getItemNameFromApi(itemApiId);

            // Searching if the item already exists in the database
            item = await prisma.item.findFirst({
                where: {
                    name: itemName
                }
            });

            if (item) {
                item = await prisma.item.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        eve_api_item_id: itemApiId
                    }
                });
            } else {
                item = await prisma.item.create({
                    data: {
                        name: itemName,
                        eve_api_item_id: itemApiId
                    }
                });
            }
        }

        // Get History (for average price and volume)
        const itemHistoryPrices = await getItemHistoryPricesFromApi(item.eve_api_item_id!, region.eve_api_id);

        try {
            let averagePrice: number = 0;
            let averageVolumePerDay: number = 0;
            let highestBuyPrice: number = 0;
            let lowestSellPrice: number | null = 0;

            if (!isArray(itemHistoryPrices)) {
                if (typeof itemHistoryPrices.error === "undefined" || itemHistoryPrices.error !== "Type not found!") {
                    console.error("itemHistoryPrices is not an array");
                    console.error("itemHistoryPrices: ", itemHistoryPrices);
                    console.error("item: ", item);
                    return;
                }
            } else {
                let historyPrices: EveApiMarketHistoryResponse[] = itemHistoryPrices as EveApiMarketHistoryResponse[];

                averagePrice = getAveragePriceFromHistory(historyPrices);
                averageVolumePerDay = getAverageVolumePerDayFromHistory(historyPrices);

                // Get order (for highest buy price and lowest sell price)
                const itemOrdersForItemFromApi = await getOrderForItemFromApi(item.eve_api_item_id!, region.eve_api_id);
                highestBuyPrice = getHighestBuyPrice(itemOrdersForItemFromApi);
                lowestSellPrice = getLowestSellPrice(itemOrdersForItemFromApi);
            }

            // Search the item price in the database
            const itemPrice = await prisma.itemPrice.findFirst({
                where: {
                    itemId: item.id,
                    regionId: regionId
                }
            });

            if (itemPrice) {
                await prisma.itemPrice.update({
                    where: {
                        id: itemPrice.id
                    },
                    data: {
                        averagePrice: averagePrice,
                        averageVolumePerDay: averageVolumePerDay,
                        highestBuyPrice: highestBuyPrice,
                        lowestSellPrice: lowestSellPrice
                    }
                });
            } else {
                await prisma.itemPrice.create({
                    data: {
                        itemId: item.id,
                        regionId: regionId,
                        averagePrice: averagePrice,
                        averageVolumePerDay: averageVolumePerDay,
                        highestBuyPrice: highestBuyPrice,
                        lowestSellPrice: lowestSellPrice,
                    }
                });
            }

            return;
        } catch (error) {
            console.error("Error while getting average price or volume per day");
            console.error("itemHistoryPrices: ", itemHistoryPrices);
        }
    } catch (error) {
        console.error("getItemPricesFromApi failed");
        console.error(error);
    }
}

const getOrderForItemFromApi = async (itemId: number, regionApiId: number): Promise<Order[]> => {
    let orders: Order[] = [];

    let page = 1;
    let responseFound = true;

    while (responseFound) {
        const response = await fetch(`https://esi.evetech.net/latest/markets/${regionApiId}/orders/?datasource=tranquility&order_type=all&page=${page}&type_id=${itemId}`);
        const responseJson = await response.json();
        orders = orders.concat(responseJson);

        if (!isArray(responseJson)) {
            responseFound = false;
        }
        page++;
    }

    return orders;
}

export const getRegionOrdersFromApi = async (regionApiId: number): Promise<Order[]> => {
    try {
        const response = await fetch(`https://esi.evetech.net/latest/markets/${regionApiId}/orders/?datasource=tranquility&order_type=all&page=1`);
        return await response.json();
    } catch (error) {
        console.error("getRegionOrdersFromApi failed");
        console.error(error);
        return [];
    }
}