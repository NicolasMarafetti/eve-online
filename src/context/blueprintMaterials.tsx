'use client'

import { getBlueprintMaterials } from "@/utils/blueprint-material";
import { BlueprintMaterial } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface BlueprintMaterialContextType {
    blueprintMaterials: BlueprintMaterial[];
    refreshBlueprintMaterials: () => void;
}

const BlueprintMaterialsContext = createContext<BlueprintMaterialContextType>({
    blueprintMaterials: [],
    refreshBlueprintMaterials: () => { }
});

export const BlueprintMaterialsProvider = ({ children }: any) => {
    const [blueprintMaterials, setBlueprintMaterials] = useState<BlueprintMaterial[]>([]);

    useEffect(() => {
        refreshBlueprintMaterials();
    }, [])

    const refreshBlueprintMaterials = async () => {
        console.log("Refresh fit");
        setBlueprintMaterials(await getBlueprintMaterials());
    }

    return (
        <BlueprintMaterialsContext.Provider
            value={{
                blueprintMaterials,
                refreshBlueprintMaterials
            }}
        >
            {children}
        </BlueprintMaterialsContext.Provider>
    );
}

export const useBlueprintMaterialsContext = () => {
    const context = useContext(BlueprintMaterialsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
