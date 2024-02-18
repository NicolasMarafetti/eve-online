import { FIT } from '@/const/fits';
import { Station } from '@prisma/client';
import React, { useState } from 'react'

interface Props {
    fits: FIT[];
    station: Station;
}

export default function StationFitsList({ fits, station }: Props) {

    const [stationFit, setStationFit] = useState<any>(null);

    const stationFitQuantity = stationFit ? stationFit.quantity : 0;

    return (
        <ul className="text-sm text-gray-500">
            {fits.map(fit => (
                <li className="my-2" key={fit.id}>
                    <span className="mr-2">{fit.name}</span>
                    <span className="mr-1">x</span>
                    <input className="bg-transparent border px-1 w-14" type="number" />
                </li>
            ))}
        </ul>
    )
}
