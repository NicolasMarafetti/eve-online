'use client'

import { Region } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface ShipContextType {
    regions: Region[];
    refreshRegions: () => void;
}

const RegionsContext = createContext<ShipContextType>({
    regions: [],
    refreshRegions: () => { }
});

export const RegionsProvider = ({ children }: any) => {
    const [regions, setRegions] = useState<Region[]>([]);

    useEffect(() => {
        refreshRegions();
    }, [])

    const refreshRegions = async () => {
        const res = await fetch('/api/regions');
        const regions = await res.json();
        setRegions(regions);
    }

    return (
        <RegionsContext.Provider
            value={{
                regions,
                refreshRegions
            }}
        >
            {children}
        </RegionsContext.Provider>
    );
}

export const useRegionsContext = () => {
    const context = useContext(RegionsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
