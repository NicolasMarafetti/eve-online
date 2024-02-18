import { Fit, Station } from '@prisma/client';
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import StationFitsList from './StationFitsList';

interface Props {
    fits: Fit[];
    getInitialStations: () => void;
    stations: Station[];
}

export default function StationsList({ fits, getInitialStations, stations }: Props) {
    const deleteStation = async (id: string) => {
        await fetch(`/api/stations/${id}`, {
            method: 'DELETE'
        });
        await getInitialStations();
    }

    return (
        <ul>
            {
                stations.map(station => (
                    <li key={station.id} className="border border-black px-4 py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-white">{station.name}</p>
                            <button onClick={() => { deleteStation(station.id) }}><FaTimes /></button>
                        </div>
                        <StationFitsList stationId={station.id} />
                    </li>
                ))
            }
        </ul>
    )
}
