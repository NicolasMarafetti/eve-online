import { EXPLORATION_ITEMS } from '@/const/exploration-items';
import { getEquipementsToBuild } from '@/utils/exploration';
import React from 'react'

export default function EquipementsToBuild() {

    const shipsToBuild = getEquipementsToBuild();

    return (
        <ul className="flex flex-wrap px-4">
            {
                Object.keys(shipsToBuild).map((shipId) => {
                    const ship = EXPLORATION_ITEMS.find(item => item.id === shipId);
                    if (!ship) return null;
                    return (
                        <li className="border border-black flex flex-col items-center text-center w-60 p-1 m-1" key={parseInt(shipId)}>
                            <p>{ship.name}</p>
                            <p>x {shipsToBuild[parseInt(shipId)].toLocaleString()}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}
