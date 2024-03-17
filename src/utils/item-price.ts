import { EveApiMarketHistoryResponse } from "@/types/eve_api";
import { prisma } from "./prisma";
import { BROKER_FEES, SALES_TAX } from "@/const/market";
import { NextApiResponse } from "next";
import { getItemPricesFromApi, getRegionOrdersFromApi } from "./eve-api";
import { isArray } from "lodash";

export const analyseItemPriceHistory = (inputValue: string): {
    price: number,
    sellPerDay: number
} => {
    let rawHistoryArray: any[] = inputValue.split(new RegExp(/\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}:\d{2}/));

    let sellHistory: {
        quantity: number,
        avg: number
    }[] = [];

    for (let i = 0; i < rawHistoryArray.length; i++) {
        if (rawHistoryArray[i]) {
            /\s*\d*\s*(\d*).*ISK.*ISK(.*)ISK/.exec(rawHistoryArray[i]);

            let quantity: number = parseInt(RegExp.$1);
            let avgString: string = RegExp.$2.replace(/\s+/g, '');
            avgString = avgString.replace(/,/, '.');
            let avg: number = parseFloat(avgString)

            sellHistory.push({
                quantity,
                avg
            })
        }
    }

    let totalQuantity: number = 0;
    let totalPrice: number = 0;
    let averagePrice: number;
    let sellPerDay: number = 0;

    for (let i = 0; i < sellHistory.length; i++) {
        totalQuantity += sellHistory[i].quantity;
        totalPrice += sellHistory[i].quantity * sellHistory[i].avg;
    }

    averagePrice = totalQuantity ? totalPrice / totalQuantity : 0;
    sellPerDay = totalQuantity / rawHistoryArray.length;

    return {
        price: averagePrice,
        sellPerDay
    }
}

export const calculateItemBeneficePerDay = (averagePrice: number, averageVolume: number, highestBuyPrice: number, lowerSellPrice: number) => {
    let beneficePerSell: number = 0;

    const myBuyPrice = (averagePrice + highestBuyPrice) / 2;
    const mySellPrice = (averagePrice + lowerSellPrice) / 2;

    // Buy Cost
    beneficePerSell -= myBuyPrice;

    // Buy/Sell fees, sell tax
    beneficePerSell -= calculateTotalFeesAndTaxCost(averagePrice, highestBuyPrice, lowerSellPrice);

    beneficePerSell += mySellPrice;

    return beneficePerSell * averageVolume;
}

export const calculateTotalFeesAndTaxCost = (averagePrice: number, highestBuyPrice: number, lowerSellPrice: number) => {
    let totalFeesAndTaxCost: number = 0;

    const myBuyPrice = (averagePrice + highestBuyPrice) / 2;
    const mySellPrice = (averagePrice + lowerSellPrice) / 2;

    // Buy fees
    totalFeesAndTaxCost += myBuyPrice * BROKER_FEES;

    // Sell fees
    totalFeesAndTaxCost += mySellPrice * BROKER_FEES;

    // Sell tax
    totalFeesAndTaxCost += mySellPrice * SALES_TAX;

    return totalFeesAndTaxCost;
}

export const getItemsPricesFromApiForRegion = async (regionId: string) => {
    const responseRaw = await fetch('/api/item_prices/update_from_api?region_id=' + regionId);
    const response = await responseRaw.json();
    const itemsRecoveredQuantity = response.itemsRecoveredQuantity;
    return itemsRecoveredQuantity;
}

export const getItemPriceHistoryFromApi = async (itemId: number, regionId: string): Promise<EveApiMarketHistoryResponse[]> => {
    const region = await prisma.region.findFirst({
        where: {
            id: regionId
        }
    });

    const rawResponse = await fetch(`https://esi.evetech.net/latest/markets/${region?.eve_api_id}/history/?datasource=tranquility&type_id=${itemId}`);
    const parsedResponse: EveApiMarketHistoryResponse[] = await rawResponse.json();

    return parsedResponse;
}

export const getItemsPrices = (regionId: string) => {
    return fetch('/api/item_prices?region_id=' + regionId);
}

const getItemsPricesFromDatabase = async (regionId: string) => {
    return prisma.itemPrice.findMany({
        where: {
            regionId
        }
    });
}

/**
 * 
 * @param regionId 
 * @param res 
 * @returns {number} The number of items that have been updated
 */
export const refreshAllRegionItemsPrices = async (regionId: string, res: NextApiResponse) => {
    const region = await prisma.region.findFirst({
        where: {
            id: regionId
        }
    });

    const items = await prisma.item.findMany();
    const itemPrices = await getItemsPricesFromDatabase(regionId);

    if (!region) return res.status(404).json({ message: "Region not found" });

    const orders = await getRegionOrdersFromApi(region.eve_api_id);

    if (!isArray(orders)) {
        console.error("orders: ", orders);
        return res.status(500).json({ message: "Error limit" });
    }

    if (orders.length === 0) return res.status(404).json({ message: "No orders found" });

    const itemsApiIds = orders.map(order => order.type_id);
    const itemsApiIdsSet = new Set<number>(itemsApiIds);

    // On limite à 50 items pour ne pas dépasser la limite de l'API
    let promises = [];
    for (let itemApiId of itemsApiIdsSet.values()) {
        if (promises.length >= 50) break;

        // Trying to search item price if we already have it in database
        const item = items.find(item => item.eve_api_item_id === itemApiId);
        if (!item) {
            promises.push(getItemPricesFromApi(itemApiId, region.id));
        } else {
            const itemPrice = itemPrices.find(itemPrice => itemPrice.itemId === item.id);
            if (!itemPrice) {
                promises.push(getItemPricesFromApi(itemApiId, region.id));
            }
        }
    }

    await Promise.all(promises);

    return promises.length;
}