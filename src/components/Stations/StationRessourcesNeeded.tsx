import React from 'react'
import StationFitItem from './StationFitItem';
import { getStationRessourcesNeeded } from '@/utils/stations';
import { useProductionsContext } from '@/context/productions';
import { useFitItemsContext } from '@/context/fitItems';
import { useStationFitsContext } from '@/context/stationFits';
import { useBlueprintsContext } from '@/context/blueprints';
import { useBlueprintMaterialsContext } from '@/context/blueprintMaterials';
import StationRessourceNeeded from './StationRessourceItem';

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

    // Order ressources needed by quantity DESC
    let orderedRessourcesNeeded: { itemId: string, quantity: number }[] = Object.keys(ressourcesNeeded).map(itemId => ({ itemId, quantity: ressourcesNeeded[itemId] }));
    orderedRessourcesNeeded.sort((a, b) => b.quantity - a.quantity);

    return (
        <div className={`overflow-hidden ${visible ? 'h-auto' : 'h-0'}`}>
            <h2>Ressources Needed</h2>
            <ul className={`text-sm text-gray-500`}>
                {
                    orderedRessourcesNeeded.map(({ itemId, quantity }) => <StationRessourceNeeded key={itemId} quantity={quantity} ressourceId={itemId} />)
                }
            </ul>
        </div>

    )
}
