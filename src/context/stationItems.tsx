'use client'

import { getStationItems } from "@/utils/station-item";
import { StationItem } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface ShipContextType {
    stationItems: StationItem[];
    refreshStationItems: () => void;
}

const StationItemsContext = createContext<ShipContextType>({
    stationItems: [],
    refreshStationItems: () => { }
});

export const StationItemsProvider = ({ children }: any) => {
    const [stationItems, setStationItems] = useState<StationItem[]>([]);

    useEffect(() => {
        refreshStationItems();
    }, [])

    const refreshStationItems = async () => {
        setStationItems(await getStationItems());
    }

    return (
        <StationItemsContext.Provider
            value={{
                stationItems,
                refreshStationItems
            }}
        >
            {children}
        </StationItemsContext.Provider>
    );
}

export const useStationItemsContext = () => {
    const context = useContext(StationItemsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
