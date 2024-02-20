'use client'

import { getStationFits } from "@/utils/station-fit";
import { StationFit } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface ShipContextType {
    stationFits: StationFit[];
    refreshStationFits: () => void;
}

const StationFitsContext = createContext<ShipContextType>({
    stationFits: [],
    refreshStationFits: () => { }
});

export const StationFitsProvider = ({ children }: any) => {
    const [stationFits, setStationFits] = useState<StationFit[]>([]);

    useEffect(() => {
        refreshStationFits();
    }, [])

    const refreshStationFits = async () => {
        setStationFits(await getStationFits());
    }

    return (
        <StationFitsContext.Provider
            value={{
                stationFits,
                refreshStationFits
            }}
        >
            {children}
        </StationFitsContext.Provider>
    );
}

export const useStationFitsContext = () => {
    const context = useContext(StationFitsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
