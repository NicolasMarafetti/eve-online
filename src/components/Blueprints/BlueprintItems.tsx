import { useBlueprintMaterialsContext } from '@/context/blueprintMaterials';
import { useItemsContext } from '@/context/items';
import React from 'react'

interface Props {
    blueprintId: string;
    visible: boolean;
}

export default function BlueprintMaterials({ blueprintId, visible }: Props) {

    const { items } = useItemsContext();
    const { blueprintMaterials } = useBlueprintMaterialsContext();

    return (
        <ul>
            {blueprintMaterials.map(blueprintMaterial => {
                if(blueprintMaterial.blueprintId !== blueprintId) return null;

                const item = items.find(item => item.id === blueprintMaterial.itemId);
                if(!item) return null;

                return (
                    <li className={`overflow-hidden text-sm text-gray-500 ${visible ? 'h-auto' : 'h-0'}`} key={blueprintMaterial.id}>{item.name} x {blueprintMaterial.quantity}</li>
                )
            })}
        </ul>
    )
}
