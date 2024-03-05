'use client'

import { ItemPrice } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface ShipContextType {
    getItemAveragePrice: (itemId: string, regionId?: string) => number;
    getItemAverageVolumePerDay: (itemId: string, regionId?: string) => number;
    itemPrices: ItemPrice[];
    getItemHighestBuyPrice: (itemId: string, regionId?: string) => number | null;
    getItemLowestSellPrice: (itemId: string, regionId?: string) => number | null;
    refreshItemPrices: () => void;
}

const ItemPricesContext = createContext<ShipContextType>({
    getItemAveragePrice: () => 0,
    getItemAverageVolumePerDay: () => 0,
    getItemHighestBuyPrice: () => 0,
    getItemLowestSellPrice: () => 0,
    itemPrices: [],
    refreshItemPrices: () => { }
});

export const ItemPricesProvider = ({ children }: any) => {
    const [itemPrices, setItemPrices] = useState<ItemPrice[]>([]);

    useEffect(() => {
        refreshItemPrices();
    }, [])

    const getItemAveragePrice = (itemId: string, regionId?: string) => {
        if (!regionId) return 0;

        const itemPrice = itemPrices.find(itemPrice => itemPrice.itemId === itemId && itemPrice.regionId === regionId);
        return itemPrice ? itemPrice.averagePrice : 0;
    }

    const getItemAverageVolumePerDay = (itemId: string, regionId?: string) => {
        if (!regionId) return 0;

        const itemPrice = itemPrices.find(itemPrice => itemPrice.itemId === itemId && itemPrice.regionId === regionId);
        return itemPrice ? itemPrice.averageVolumePerDay : 0;
    }

    const getItemHighestBuyPrice = (itemId: string, regionId?: string) => {
        if (!regionId) return 0;

        const itemPrice = itemPrices.find(itemPrice => itemPrice.itemId === itemId && itemPrice.regionId === regionId);
        return itemPrice ? itemPrice.highestBuyPrice : 0;
    }

    const getItemLowestSellPrice = (itemId: string, regionId?: string) => {
        if (!regionId) return 0;

        const itemPrice = itemPrices.find(itemPrice => itemPrice.itemId === itemId && itemPrice.regionId === regionId);
        return itemPrice ? itemPrice.lowestSellPrice : 0;
    }

    const refreshItemPrices = async () => {
        const res = await fetch('/api/item_prices');
        const itemPrices = await res.json();
        setItemPrices(itemPrices);
    }

    return (
        <ItemPricesContext.Provider
            value={{
                getItemAveragePrice,
                getItemAverageVolumePerDay,
                getItemHighestBuyPrice,
                getItemLowestSellPrice,
                itemPrices,
                refreshItemPrices
            }}
        >
            {children}
        </ItemPricesContext.Provider>
    );
}

export const useItemPricesContext = () => {
    const context = useContext(ItemPricesContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
