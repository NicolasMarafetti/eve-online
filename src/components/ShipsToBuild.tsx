import { EXPLORATION_ITEMS } from '@/const/exploration-items';
import { getShipsToBuild } from '@/utils/exploration';
import React from 'react'

export default function ShipsToBuild() {

    const shipsToBuild = getShipsToBuild();

    return (
        <ul>
            {
                Object.keys(shipsToBuild).map((shipId) => {
                    const ship = EXPLORATION_ITEMS.find(item => item.id === parseInt(shipId));
                    if (!ship) return null;
                    return (
                        <li className="border border-black flex flex-col items-center p-1 m-1" key={parseInt(shipId)}>
                            <p>{ship.name}</p>
                            <p>x {shipsToBuild[parseInt(shipId)].toLocaleString()}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}
