'use client'

import { createContext, useContext, useState } from "react";
import FilterContextType, { FilterType } from "@/types/FilterContextType";

const FiltersContext = createContext<FilterContextType>({
    addingShip: false,
    filters: {
        name: "",
        value: ""
    },
    setAddingShip: () => { },
    setFilters: () => { }
});

export const FiltersProvider = ({ children }: any) => {
    const [addingShip, setAddingShip] = useState(false);
    const [filters, setFilters] = useState<FilterType>({
        name: "",
        value: ""
    });

    return (
        <FiltersContext.Provider
            value={{
                addingShip,
                filters,
                setAddingShip,
                setFilters
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
}

export const useFiltersContext = () => {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
