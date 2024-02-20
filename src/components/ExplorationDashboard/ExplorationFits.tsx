'use client';

import { useFitsContext } from '@/context/fits';
import { useStationFitsContext } from '@/context/stationFits';
import { getFitsToProduces } from '@/utils/fit';
import React, { useEffect, useState } from 'react'

export default function ExplorationFits() {

    const [fitsToProduce, setFitsToProduce] = useState<{ [fitId: string]: number }>({});

    const { fits } = useFitsContext();
    const { stationFits } = useStationFitsContext();

    useEffect(() => {
        setFitsToProduce(getFitsToProduces(stationFits));
    }, [fits, stationFits])

    return (
        <div className="pb-4 text-white">
            <h2 className="bg-production-section-title-background bg-cover font-bold py-3 px-4 uppercase">Fits</h2>
            <ul className="flex px-4">
                {
                    Object.keys(fitsToProduce).map((fitId, index) => {
                        const fit = fits.find(fit => fit.id === fitId);
                        if (!fit) return null;
                        return (
                            <li className="flex flex-col items-center px-2 w-60" key={index}>
                                <p className="whitespace-nowrap">{fit.name}</p>
                                <p>x {fitsToProduce[fitId]}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
