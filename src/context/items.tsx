'use client'

import { Item } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface ShipContextType {
    items: Item[];
    refreshItems: () => void;
}

const ItemsContext = createContext<ShipContextType>({
    items: [],
    refreshItems: () => { }
});

export const ItemsProvider = ({ children }: any) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        refreshItems();
    }, [])

    const refreshItems = async () => {
        const res = await fetch('/api/items');
        const items = await res.json();
        setItems(items);
    }

    return (
        <ItemsContext.Provider
            value={{
                items,
                refreshItems
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}

export const useItemsContext = () => {
    const context = useContext(ItemsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
