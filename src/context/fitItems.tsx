'use client'

import { getFitsItems } from "@/utils/exploration";
import { FitItem } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface ShipContextType {
    fitItems: FitItem[];
    refreshFitItems: () => void;
}

const FitItemsContext = createContext<ShipContextType>({
    fitItems: [],
    refreshFitItems: () => {}
});

export const FitItemsProvider = ({ children }: any) => {
    const [fitItems, setFitItems] = useState<FitItem[]>([]);

    useEffect(() => {
        refreshFitItems();
    }, [])

    const refreshFitItems = async () => {
        console.log("Refresh fit");
        setFitItems(await getFitsItems());
    }

    return (
        <FitItemsContext.Provider
            value={{
                fitItems,
                refreshFitItems
            }}
        >
            {children}
        </FitItemsContext.Provider>
    );
}

export const useFitItemsContext = () => {
    const context = useContext(FitItemsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
