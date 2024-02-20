import React from 'react'
import StationFitItem from './StationFitItem';
import { useFitsContext } from '@/context/fits';

interface Props {
    stationId: string;
    visible: boolean;
}

export default function StationFitsList({ stationId, visible }: Props) {

    const { fits } = useFitsContext();

    return (
        <div className={`overflow-hidden ${visible ? 'h-auto' : 'h-0'}`}>
            <h2>Fits wanted</h2>
            <ul className={`text-sm text-gray-500`}>
                {fits.map(fit => <StationFitItem key={fit.id} fitId={fit.id} stationId={stationId} />)}
            </ul>
        </div>

    )
}
