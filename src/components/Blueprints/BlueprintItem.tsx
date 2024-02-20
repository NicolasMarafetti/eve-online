import { Blueprint, BlueprintMaterial } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaTimes } from 'react-icons/fa';
import AddBlueprintItemModal from './AddBlueprintMaterialModal';
import BlueprintItems from './BlueprintItems';
import { useBlueprintsContext } from '@/context/blueprints';
import { useItemsContext } from '@/context/items';

interface Props {
    blueprintId: string;
}

export default function BlueprintMaterial({ blueprintId }: Props) {

    const { blueprints } = useBlueprintsContext();
    const { items } = useItemsContext();

    const [addItemModalOpen, setAddItemModalOpen] = useState(false);
    const [materialsVisible, setMaterialsVisible] = useState<boolean>(false);

    const addItemClicked = () => {
        setAddItemModalOpen(true);
    }

    const deleteBlueprint = async (id: string) => {
        await fetch(`/api/blueprints/${id}`, {
            method: 'DELETE'
        });
    }

    const toggleFitVisibility = () => {
        setMaterialsVisible(!materialsVisible);
    }

    const blueprint = blueprints.find(blueprint => blueprint.id === blueprintId);
    if (!blueprint) return null;

    const itemCreated = items.find(item => item.id === blueprint.itemCreatedId);
    if (!itemCreated) return null;

    return (
        <li key={blueprintId} className="border border-black px-4 py-2">
            <div className="flex blueprints-center justify-between">
                <span className="flex items-center">
                    <p className="mr-2 text-white">{itemCreated.name} Blueprint</p>
                    {
                        materialsVisible
                        ?
                        <FaArrowUp className="cursor-pointer" onClick={toggleFitVisibility} />
                        :
                        <FaArrowDown className="cursor-pointer" onClick={toggleFitVisibility} />
                    }
                </span>
                <button onClick={() => { deleteBlueprint(blueprintId) }}><FaTimes /></button>
            </div>
            <BlueprintItems blueprintId={blueprintId} visible={materialsVisible} />
            <button className="text-sm text-gray-500 border border-white p-2" onClick={addItemClicked}>Ajouter un matériel</button>

            {addItemModalOpen && <AddBlueprintItemModal closeModal={() => setAddItemModalOpen(false)} blueprintId={blueprintId} />}
        </li>
    )
}
