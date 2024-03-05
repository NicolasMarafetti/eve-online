'use client';

import { useItemsContext } from '@/context/items';
import { useItemPricesContext } from '@/context/itemsPrices';
import { useRegionsContext } from '@/context/regions';
import { calculateItemBeneficePerDay, calculateTotalFeesAndTaxCost, getItemsPricesFromApiForRegion } from '@/utils/item-price';
import { Item } from '@prisma/client';
import React, { useState } from 'react';
import { IoReload } from 'react-icons/io5';

interface ItemToRender {
    id: string,
    name: string,
    averagePrice: number,
    averageVolume: number,
    highestBuyPrice: number,
    lowestSellPrice: number,
    beneficePerDay: number,
    myBuyPrice: number,
    mySellPrice: number,
    totalSellCost: number,
    quantityToBuy: number
}

export default function Page() {

    const { items, refreshItems } = useItemsContext();
    const { getItemAveragePrice, getItemAverageVolumePerDay, getItemHighestBuyPrice, getItemLowestSellPrice, refreshItemPrices } = useItemPricesContext();
    const { regions } = useRegionsContext();

    const [activeItemId, setActiveItemId] = useState<string>("");
    const [clipBoardCopy, setClipBoardCopy] = useState<boolean>(false);
    const [iskInWallet, setIskInWallet] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [regionId, setRegionId] = useState<string>("");

    const copyToClipboardSomething = (text: string) => {
        navigator.clipboard.writeText(text);
        setClipBoardCopy(true);
        setTimeout(() => {
            setClipBoardCopy(false);
        }, 1000);
    }

    const getItemsForRender = (items: Item[]): ItemToRender[] => {
        const maxIskToSpend = iskInWallet * 0.1;

        let itemsForRenderFull = items.map(item => {
            const averagePrice = getItemAveragePrice(item.id, regionId);
            const averageVolume = getItemAverageVolumePerDay(item.id, regionId);
            const highestBuyPrice = getItemHighestBuyPrice(item.id, regionId) || 0;
            const lowestSellPrice = getItemLowestSellPrice(item.id, regionId) || 0;
            const beneficePerDay = (highestBuyPrice && lowestSellPrice) ? calculateItemBeneficePerDay(averagePrice, averageVolume, highestBuyPrice, lowestSellPrice) : 0;
            const myBuyPrice = (highestBuyPrice + averagePrice) / 2;
            const mySellPrice = (lowestSellPrice + averagePrice) / 2;
            const feesAndTaxCost = calculateTotalFeesAndTaxCost(averagePrice, highestBuyPrice, lowestSellPrice);
            const totalSellCost = myBuyPrice + feesAndTaxCost;

            return {
                id: item.id,
                name: item.name,
                averagePrice,
                averageVolume,
                highestBuyPrice,
                lowestSellPrice,
                beneficePerDay,
                myBuyPrice,
                mySellPrice,
                totalSellCost,
                quantityToBuy: Math.floor(maxIskToSpend / totalSellCost)
            }
        });

        // Filters items without highestBuyPrice or lowestSellPrice or beneficePerDay
        let itemsForRender: ItemToRender[] = itemsForRenderFull.filter(item => {
            if (!item) return false;
            if (!item.highestBuyPrice || !item.lowestSellPrice || !item?.beneficePerDay) return false;
            return true;
        });

        // Filters items where maxBuyPrice is superior of average price or minSellPrice is inferior of average price
        itemsForRender = itemsForRender.filter(item => {
            if (item.highestBuyPrice >= item.averagePrice || item.lowestSellPrice <= item.averagePrice) return false;
            return true;
        });

        // Order items by beneficePerDay
        itemsForRender.sort((a, b) => b.beneficePerDay - a.beneficePerDay);

        // Filter items that I can't afford
        itemsForRender = itemsForRender.filter(item => {
            if (item.totalSellCost > maxIskToSpend) return false;
            return true;
        });

        return itemsForRender;
    }

    const iskInWalletChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIskInWallet(parseInt(e.target.value));
    }

    const refreshItemClicked = async (itemId: string) => {
        setLoading(true);
        await fetch('/api/item_prices/update_from_api?region_id=' + regionId + '&item_id=' + itemId);
        refreshItemPrices();
        setLoading(false);
    }

    const selectChanged = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLoading(true);

        setRegionId(e.target.value);

        await getItemsPricesFromApiForRegion(e.target.value);

        await refreshItems();
        await refreshItemPrices();

        setLoading(false);
    }

    const tableLineClicked = (itemId: string) => {
        setActiveItemId(itemId);
    }

    const itemsForRenderTable = getItemsForRender(items);

    return (
        <div>
            <div className="flex items-center">
                <div className="mr-5">
                    <h2>Region</h2>
                    <select className="text-black" onChange={selectChanged}>
                        {regions.map((region, index) => (
                            <option key={index} value={region.id}>{region.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <h2>ISK in wallet</h2>
                    <input className="text-black" onChange={iskInWalletChanged} type="number" value={iskInWallet} />
                </div>
            </div>
            {loading && <IoReload />}
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Average Price</th>
                        <th>Average Volume / day</th>
                        <th>Highest buy price</th>
                        <th>Lowest sell price</th>
                        <th>Benefice per day</th>
                        <th>Refresh</th>
                        <th>My Buy Price</th>
                        <th>My Sell Price</th>
                        <th>Quantity to buy</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemsForRenderTable.map((item, index) => {
                            return (
                                <tr className={`border-b-2 border-solid border-white ${activeItemId === item.id ? "bg-green-800" : ""}`} key={index} onClick={() => tableLineClicked(item.id)}>
                                    <td className="cursor-pointer" onClick={() => copyToClipboardSomething(item.name)}>{item.name}</td>
                                    <td>{item.averagePrice.toLocaleString()}</td>
                                    <td>{item.averageVolume.toLocaleString()}</td>
                                    <td>{item.highestBuyPrice.toLocaleString()}</td>
                                    <td>{item.lowestSellPrice.toLocaleString()}</td>
                                    <td>{item.beneficePerDay.toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => refreshItemClicked(item.id)}><IoReload /></button>
                                    </td>
                                    <td className="cursor-pointer" onClick={() => copyToClipboardSomething(item.myBuyPrice.toString())}>{item.myBuyPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td className="cursor-pointer" onClick={() => copyToClipboardSomething(item.mySellPrice.toString())}>{item.mySellPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td className="cursor-pointer" onClick={() => copyToClipboardSomething(item.quantityToBuy.toString())}>{item.quantityToBuy}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {clipBoardCopy && <p className="absolute right-5 bottom-5 p-5 bg-blue-800">Copied to clipboard</p>}
        </div>
    )
}
