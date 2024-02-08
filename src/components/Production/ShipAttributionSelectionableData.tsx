import { EXPLORATION_ITEMS } from '@/const/exploration-items';
import { useShipsContext } from '@/context/shipsToBuild';
import React from 'react'

export default function ShipAttributionSelectionableData() {

    const { shipsToBuild } = useShipsContext();

    return (
        <td className="bg-[#203b59] border-4 border-black cursor-pointer py-2 relative w-32">
            <select className="bg-[rgb(32,59,89)] cursor-pointer left-0 w-full">
                <option></option>
                {
                    Object.keys(shipsToBuild).map((shipId) => {
                        const ship = EXPLORATION_ITEMS.find(item => item.id === parseInt(shipId));
                        if(!ship) return null;
                        return (
                            <option key={shipId} value={shipId}>{ship.name}</option>
                        )
                    })
                }
            </select>
        </td>
    )
}
