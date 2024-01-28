'use client'

import { useFiltersContext } from '@/context/filters';
import Image from 'next/image';
import React from 'react'

import './ShipFilter.scss';

export default function ShipFilter() {

    const { setAddingShip } = useFiltersContext();

    const addShipClicked = () => {
        setAddingShip(true);
    }

    return (
        <div className="flex flex-col m-auto pb-[5vh] w-40">
            <label className="text-gray-500" htmlFor="ship_name">Ship</label>
            <ul>
                <li>
                    <button className="h-56">
                        <div className="card h-full w-full">
                            <div className="wrapper h-full w-full">
                                <Image alt="ship" src="/images/Ship Filters/eve-online-card-background.webp" height="100" width="100" className="cover-image w-full" />
                            </div>
                            <p className="absolute left-1/2 bottom-8 text-[#ebac3c] text-center text-xl title transform -translate-x-1/2 uppercase">Destroyer</p>
                            <Image alt="ship" src="/images/Ship Filters/ship2.webp" height="300" width="300" className="character h-4/6" />
                        </div>
                    </button>
                </li>
            </ul>
            <button className="bg-gray-500 text-white" onClick={addShipClicked}>Add a ship</button>
        </div>
    )
}
