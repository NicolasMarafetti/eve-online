'use client'

import { getFits } from "@/utils/fit";
import { Fit } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface ShipContextType {
    fits: Fit[];
    refreshFits: () => void;
}

const FitsContext = createContext<ShipContextType>({
    fits: [],
    refreshFits: () => { }
});

export const FitsProvider = ({ children }: any) => {
    const [fits, setFits] = useState<Fit[]>([]);

    useEffect(() => {
        refreshFits();
    }, [])

    const refreshFits = async () => {
        setFits(await getFits());
    }

    return (
        <FitsContext.Provider
            value={{
                fits,
                refreshFits
            }}
        >
            {children}
        </FitsContext.Provider>
    );
}

export const useFitsContext = () => {
    const context = useContext(FitsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
