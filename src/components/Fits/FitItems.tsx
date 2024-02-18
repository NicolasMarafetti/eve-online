import { useFitItemsContext } from '@/context/fitItems';
import { useItemsContext } from '@/context/items';
import React from 'react'

interface Props {
    fitId: string;
}

export default function FitItems({ fitId }: Props) {

    const { items } = useItemsContext();
    const { fitItems } = useFitItemsContext();

    return (
        <ul>
            {fitItems.map(fitItem => {
                if(fitItem.fitId !== fitId) return null;

                const item = items.find(item => item.id === fitItem.itemId);
                if(!item) return null;

                return (
                    <li className="text-sm text-gray-500" key={fitItem.id}>{item.name} x {fitItem.quantity}</li>
                )
            })}
        </ul>
    )
}
