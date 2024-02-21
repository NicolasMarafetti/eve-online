'use client';

import { useFitItemsContext } from '@/context/fitItems';
import { useItemsContext } from '@/context/items';
import { useStationFitsContext } from '@/context/stationFits';
import { getEquipementsToBuild } from '@/utils/exploration';
import React, { useEffect, useState } from 'react'
import EquipmentTableCharaterCell from './Production/EquipmentTableCharaterCell';
import EquipmentTableStationCell from './Production/EquipmentTableStationCell';
import { useBlueprintsContext } from '@/context/blueprints';
import { getBlueprintHours, getBlueprintMinutes, getBlueprintSeconds } from '@/utils/blueprint';

export default function EquipementsToBuild() {

    const { blueprints } = useBlueprintsContext();
    const { items } = useItemsContext();
    const { fitItems } = useFitItemsContext();
    const { stationFits } = useStationFitsContext();

    const [itemsToBuild, setItemsToBuild] = useState<{ [itemId: string]: number }>({});

    useEffect(() => {
        setItemsToBuild(getEquipementsToBuild(fitItems, stationFits));
    }, [fitItems, stationFits]);

    const itemProductionDuration = (itemId: string, quantity: number): number => {
        const item = items.find(item => item.id === itemId);
        if (!item) return 0;

        // Search the blueprint
        const blueprint = blueprints.find(blueprint => blueprint.itemCreatedId === itemId);
        if (!blueprint) return 0;

        return blueprint.duration * quantity;
    }

    // Add item production duration to items
    let itemsWithDuration = Object.keys(itemsToBuild).map(itemId => ({
        itemId,
        quantity: itemsToBuild[itemId],
        duration: itemProductionDuration(itemId, itemsToBuild[itemId]),
    })).sort((a, b) => b.duration - a.duration); // Sorting in descending order of duration

    return (
        <table>
            <thead>
                <tr>
                    <th className="px-1">Item</th>
                    <th className="px-1">Durée</th>
                    <th className="px-1">Quantity</th>
                    <th className="px-1">Character</th>
                    <th className="px-1">Station</th>
                </tr>
            </thead>
            <tbody>
                {
                    itemsWithDuration.map(({ itemId, quantity, duration }) => {
                        const item = items.find(item => item.id === itemId);
                        if (!item) return null;

                        return (
                            <tr key={itemId}>
                                <td className="px-1">{item.name}</td>
                                <td>{getBlueprintHours(duration)}:{getBlueprintMinutes(duration)}:{getBlueprintSeconds(duration)}</td>
                                <td className="px-1">{quantity.toLocaleString()}</td>
                                <EquipmentTableCharaterCell itemId={itemId} />
                                <EquipmentTableStationCell itemId={itemId} />
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}
