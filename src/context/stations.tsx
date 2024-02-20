'use client'

import { Station } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface StationContextType {
    stations: Station[];
    refreshStations: () => void;
}

const StationsContext = createContext<StationContextType>({
    stations: [],
    refreshStations: () => { }
});

export const StationsProvider = ({ children }: any) => {
    const [stations, setStations] = useState<Station[]>([]);

    useEffect(() => {
        refreshStations();
    }, [])

    const refreshStations = async () => {
        const res = await fetch('/api/stations');
        const stations = await res.json();
        setStations(stations);
    }

    return (
        <StationsContext.Provider
            value={{
                stations,
                refreshStations
            }}
        >
            {children}
        </StationsContext.Provider>
    );
}

export const useStationsContext = () => {
    const context = useContext(StationsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
