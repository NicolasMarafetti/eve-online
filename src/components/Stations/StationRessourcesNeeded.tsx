import React from 'react'
import StationFitItem from './StationFitItem';
import { getStationRessourcesNeeded } from '@/utils/stations';
import { useProductionsContext } from '@/context/productions';
import { useFitItemsContext } from '@/context/fitItems';
import { useStationFitsContext } from '@/context/stationFits';
import { useBlueprintsContext } from '@/context/blueprints';
import { useBlueprintMaterialsContext } from '@/context/blueprintMaterials';

interface Props {
    stationId: string;
    visible: boolean;
}

export default function StationRessourcesNeeded({ stationId, visible }: Props) {
    const { blueprints } = useBlueprintsContext();
    const { blueprintMaterials } = useBlueprintMaterialsContext();
    const { fitItems } = useFitItemsContext();
    const { productions } = useProductionsContext();
    const { stationFits } = useStationFitsContext();

    const ressourcesNeeded = getStationRessourcesNeeded(blueprints, blueprintMaterials, fitItems, productions, stationId, stationFits);

    return (
        <div className={`overflow-hidden ${visible ? 'h-auto' : 'h-0'}`}>
            <h2>Ressources Needed</h2>
            <ul className={`text-sm text-gray-500`}>
                {Object.keys(ressourcesNeeded).map(fitId => <StationFitItem key={fitId} fitId={fitId} stationId={stationId} />)}
            </ul>
        </div>

    )
}
