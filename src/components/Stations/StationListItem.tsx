import { Station } from '@prisma/client'
import React from 'react'
import { FaArrowDown, FaTimes } from 'react-icons/fa'
import StationFitsList from './StationFitsList'
import { useStationsContext } from '@/context/stations'
import StationRessourcesNeeded from './StationRessourcesNeeded'

interface Props {
    station: Station
}

export default function StationListItem({ station }: Props) {

    const { refreshStations } = useStationsContext();

    const [fitsVisible, setFitsVisible] = React.useState<boolean>(false);

    const deleteStation = async (id: string) => {
        await fetch(`/api/stations/${id}`, {
            method: 'DELETE'
        });
        refreshStations();
    }

    const toggleFitVisibility = () => {
        setFitsVisible(!fitsVisible);
    }

    return (
        <li key={station.id} className="border border-black px-4 py-2">
            <div className="flex items-center justify-between">
                <span className="flex items-center">
                    <p className="mr-2 text-white">{station.name}</p>
                    <FaArrowDown className="cursor-pointer" onClick={toggleFitVisibility} />
                </span>
                <button onClick={() => { deleteStation(station.id) }}><FaTimes /></button>
            </div>
            <StationFitsList stationId={station.id} visible={fitsVisible} />
            <StationRessourcesNeeded stationId={station.id} visible={fitsVisible} />
        </li>
    )
}
