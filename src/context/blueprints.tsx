'use client'

import { getBlueprints } from "@/utils/blueprint";
import { Blueprint } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface BlueprintContextType {
    blueprints: Blueprint[];
    refreshBlueprints: () => void;
}

const BlueprintsContext = createContext<BlueprintContextType>({
    blueprints: [],
    refreshBlueprints: () => { }
});

export const BlueprintsProvider = ({ children }: any) => {
    const [blueprints, setBlueprints] = useState<Blueprint[]>([]);

    useEffect(() => {
        refreshBlueprints();
    }, [])

    const refreshBlueprints = async () => {
        setBlueprints(await getBlueprints());
    }

    return (
        <BlueprintsContext.Provider
            value={{
                blueprints,
                refreshBlueprints
            }}
        >
            {children}
        </BlueprintsContext.Provider>
    );
}

export const useBlueprintsContext = () => {
    const context = useContext(BlueprintsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
