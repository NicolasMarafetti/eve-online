'use client';

import { useCharactersContext } from '@/context/characters';
import { useFitItemsContext } from '@/context/fitItems';
import { useItemsContext } from '@/context/items';
import { useStationFitsContext } from '@/context/stationFits';
import { getEquipementsToBuild } from '@/utils/exploration';
import React, { useEffect, useState } from 'react'
import EquipmentTableCharaterCell from './Production/EquipmentTableCharaterCell';
import EquipmentTableStationCell from './Production/EquipmentTableStationCell';

export default function EquipementsToBuild() {

    const { items } = useItemsContext();
    const { fitItems } = useFitItemsContext();
    const { stationFits } = useStationFitsContext();

    const [itemsToBuild, setItemsToBuild] = useState<{ [itemId: string]: number }>({});

    useEffect(() => {
        setItemsToBuild(getEquipementsToBuild(fitItems, stationFits));
    }, [fitItems, stationFits]);

    // Convert itemsToBuild object into an array of objects and sort by quantity desc
    const sortedItemsToBuild = Object.keys(itemsToBuild).map(itemId => ({
        itemId,
        quantity: itemsToBuild[itemId],
    })).sort((a, b) => b.quantity - a.quantity); // Sorting in descending order of quantity

    return (
        <table>
            <thead>
                <tr>
                    <th className="px-1">Item</th>
                    <th className="px-1">Quantity</th>
                    <th className="px-1">Character</th>
                    <th className="px-1">Station</th>
                </tr>
            </thead>
            <tbody>
                {
                    sortedItemsToBuild.map(({ itemId, quantity }) => {
                        const item = items.find(item => item.id === itemId);
                        if (!item) return null;
                        return (
                            <tr key={itemId}>
                                <td className="px-1">{item.name}</td>
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
