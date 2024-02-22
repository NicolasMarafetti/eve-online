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
import { searchItemQuantityInStation, updateStationItemQuantity } from '@/utils/station-item';
import { useProductionsContext } from '@/context/productions';
import { useStationItemsContext } from '@/context/stationItems';

interface ItemForEquipmentTable {
    itemId: string;
    quantityOwned: number;
    quantityToBuild: number;
    duration: number;
}

export default function EquipementsToBuild() {

    const { blueprints } = useBlueprintsContext();
    const { items } = useItemsContext();
    const { fitItems } = useFitItemsContext();
    const { productions } = useProductionsContext();
    const { stationFits } = useStationFitsContext();
    const { stationItems, refreshStationItems } = useStationItemsContext();

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

    const stationItemQuantityBlured = async (event: React.FocusEvent<HTMLInputElement>, itemId: string) => {
        const production = productions.find(production => production.itemId === itemId);
        if (!production || !production.stationId) return;

        await updateStationItemQuantity(production.stationId, itemId, parseInt(event.target.value));
        refreshStationItems();
    }

    // Add item production duration to items
    let itemsWithDuration: ItemForEquipmentTable[] = Object.keys(itemsToBuild).map(itemId => {
        const quantityOwned = searchItemQuantityInStation(itemId, productions, stationItems);

        const quantityToBuild = itemsToBuild[itemId] - quantityOwned;

        return {
            itemId,
            quantityToBuild,
            quantityOwned,
            duration: itemProductionDuration(itemId, quantityToBuild),
        }
    }).sort((a, b) => b.duration - a.duration); // Sorting in descending order of duration

    return (
        <table>
            <thead>
                <tr>
                    <th className="px-1">Item</th>
                    <th className="px-1">Durée</th>
                    <th className="px-1">Quantity to build</th>
                    <th className="px-1">Quantity in stock</th>
                    <th className="px-1">Character</th>
                    <th className="px-1">Station</th>
                </tr>
            </thead>
            <tbody>
                {
                    itemsWithDuration.map(({ itemId, quantityToBuild, quantityOwned, duration }) => {
                        const item = items.find(item => item.id === itemId);
                        if (!item) return null;

                        const production = productions.find(production => production.itemId === itemId);
                        if (!production || !production.stationId) return;

                        const itemsOwnedInStation = stationItems.find(stationItem => stationItem.itemId === itemId && stationItem.stationId === production.stationId);

                        return (
                            <tr className="border-y border-white border-dashed" key={itemId}>
                                <td className="px-1 py-2">{item.name}</td>
                                <td>{getBlueprintHours(duration)}:{getBlueprintMinutes(duration)}:{getBlueprintSeconds(duration)}</td>
                                <td className="px-1">{quantityToBuild.toLocaleString()}</td>
                                <td className="px-1"><input className="text-black w-10" onBlur={(e) => stationItemQuantityBlured(e, itemId)} type="number" defaultValue={quantityOwned} /></td>
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
