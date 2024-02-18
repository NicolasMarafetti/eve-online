import React from 'react'
import StationFitItem from './StationFitItem';
import { useFitsContext } from '@/context/fits';

interface Props {
    stationId: string;
}

export default function StationFitsList({ stationId }: Props) {

    const { fits } = useFitsContext();

    return (
        <ul className="text-sm text-gray-500">
            {fits.map(fit => <StationFitItem key={fit.id} fitId={fit.id} stationId={stationId} />)}
        </ul>
    )
}
