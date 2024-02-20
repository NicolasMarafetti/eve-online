import { useProductionsContext } from '@/context/productions';
import { useStationsContext } from '@/context/stations';
import React from 'react'

interface Props {
    itemId: string;
}

export default function EquipmentTableStationCell({ itemId }: Props) {

    const { stations } = useStationsContext();
    const { productions, refreshProductions } = useProductionsContext();

    const stationChanged = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const stationId = event.target.value;
        await fetch(`/api/productions`, {
            method: 'PUT',
            body: JSON.stringify({ itemId, stationId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        refreshProductions();
    };

    const production = productions.find(production => production.itemId === itemId);
    const stationSelected = (production && production.stationId) ? production.stationId : '';

    return (
        <td className="px-1">
            <select className="text-black" onChange={stationChanged} value={stationSelected}>
                <option value="">Select a station</option>
                {
                    stations.map(station => (
                        <option key={station.id} value={station.id}>{station.name}</option>
                    ))

                }
            </select>
        </td>
    )
}
