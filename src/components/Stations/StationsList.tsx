import React from 'react'
import { useStationsContext } from '@/context/stations';
import StationListItem from './StationListItem';

export default function StationsList() {

    const { stations } = useStationsContext();

    return (
        <ul>
            {stations.map(station => (<StationListItem key={station.id} station={station} />))}
        </ul>
    )
}
