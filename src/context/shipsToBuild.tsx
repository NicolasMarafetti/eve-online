'use client'

import { getShipsToBuild } from "@/utils/exploration";
import { createContext, useContext, useState } from "react";

interface ShipsToBuild {
    [shipId: string]: number;
}

interface ShipContextType {
    addingShip: boolean;
    shipsToBuild: ShipsToBuild;
    setAddingShip: (value: boolean) => void;
    setShips: (value: ShipsToBuild) => void;
}

const ShipsContext = createContext<ShipContextType>({
    addingShip: false,
    shipsToBuild: {},
    setAddingShip: () => { },
    setShips: () => { }
});

export const ShipsProvider = ({ children }: any) => {
    const [addingShip, setAddingShip] = useState(false);
    const [shipsToBuild, setShips] = useState<ShipsToBuild>(getShipsToBuild());

    return (
        <ShipsContext.Provider
            value={{
                addingShip,
                shipsToBuild,
                setAddingShip,
                setShips
            }}
        >
            {children}
        </ShipsContext.Provider>
    );
}

export const useShipsContext = () => {
    const context = useContext(ShipsContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
