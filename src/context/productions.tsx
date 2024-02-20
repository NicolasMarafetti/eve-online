'use client'

import { Production } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface ProductionContextType {
    productions: Production[];
    refreshProductions: () => void;
}

const ProductionsContext = createContext<ProductionContextType>({
    productions: [],
    refreshProductions: () => { }
});

export const ProductionsProvider = ({ children }: any) => {
    const [productions, setProductions] = useState<Production[]>([]);

    useEffect(() => {
        refreshProductions();
    }, [])

    const refreshProductions = async () => {
        const res = await fetch('/api/productions');
        const productions = await res.json();
        setProductions(productions);
    }

    return (
        <ProductionsContext.Provider
            value={{
                productions,
                refreshProductions
            }}
        >
            {children}
        </ProductionsContext.Provider>
    );
}

export const useProductionsContext = () => {
    const context = useContext(ProductionsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
