import { EXPLORATION_ITEMS } from '@/const/exploration-items';
import { getShipsToBuild } from '@/utils/exploration';
import React from 'react'

export default function ShipsToBuild() {

    const shipsToBuild = getShipsToBuild();

    return (
        <ul className="flex justify-center">
            {
                Object.keys(shipsToBuild).map((shipId) => {
                    const ship = EXPLORATION_ITEMS.find(item => item.id === shipId);
                    if (!ship) return null;
                    return (
                        <li className="border border-black flex items-center p-1 m-1" key={parseInt(shipId)}>
                            <div className="flex flex-col items-center">
                                <p>{ship.name}</p>
                                <p>x {shipsToBuild[parseInt(shipId)].toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-600 h-10 rounded-full w-10">

                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}
