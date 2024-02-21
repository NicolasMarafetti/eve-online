/* eslint-disable react-hooks/exhaustive-deps */
import { Blueprint, BlueprintMaterial } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaTimes } from 'react-icons/fa';
import AddBlueprintItemModal from './AddBlueprintMaterialModal';
import BlueprintItems from './BlueprintItems';
import { useBlueprintsContext } from '@/context/blueprints';
import { useItemsContext } from '@/context/items';
import { getBlueprintHours, getBlueprintMinutes, getBlueprintSeconds } from '@/utils/blueprint';

interface Props {
    blueprintId: string;
}

export default function BlueprintMaterial({ blueprintId }: Props) {

    const { blueprints, refreshBlueprints } = useBlueprintsContext();
    const { items } = useItemsContext();

    const [addItemModalOpen, setAddItemModalOpen] = useState(false);
    const [bluePrintDuration, setBluePrintDuration] = useState<{ hours: number, minutes: number, seconds: number }>({ hours: 0, minutes: 0, seconds: 0 });
    const [materialsVisible, setMaterialsVisible] = useState<boolean>(false);

    const addItemClicked = () => {
        setAddItemModalOpen(true);
    }

    const deleteBlueprint = async (id: string) => {
        await fetch(`/api/blueprints/${id}`, {
            method: 'DELETE'
        });
    }

    const hoursChanged = (e: React.FocusEvent<HTMLInputElement>) => {
        const hours = e.target.value;
        setBluePrintDuration({ ...bluePrintDuration, hours: parseInt(hours) });
        modifyBlueprintDuration({hours: parseInt(hours), minutes: bluePrintDuration.minutes, seconds: bluePrintDuration.seconds});
    }

    const minutesChanged = (e: React.FocusEvent<HTMLInputElement>) => {
        const minutes = e.target.value;
        setBluePrintDuration({ ...bluePrintDuration, minutes: parseInt(minutes) });
        modifyBlueprintDuration({hours: bluePrintDuration.hours, minutes: parseInt(minutes), seconds: bluePrintDuration.seconds});
    }

    const modifyBlueprintDuration = async (durationObject: {hours: number, minutes: number, seconds: number}) => {
        const duration = (durationObject.hours * 3600) + (durationObject.minutes * 60) + durationObject.seconds;
        await fetch(`/api/blueprints/${blueprintId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ duration })
        });
        refreshBlueprints();
    }

    const secondsChanged = (e: React.FocusEvent<HTMLInputElement>) => {
        const seconds = e.target.value;
        setBluePrintDuration({ ...bluePrintDuration, seconds: parseInt(seconds) });
        modifyBlueprintDuration({hours: bluePrintDuration.hours, minutes: bluePrintDuration.minutes, seconds: parseInt(seconds)});
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
                    <p className="mr-2 text-white">{itemCreated.name} Blueprint - </p>
                    <input className="text-black w-10" defaultValue={getBlueprintHours(blueprint.duration)} onBlur={hoursChanged} type="number" />
                    <span>:</span>
                    <input className="text-black w-10" defaultValue={getBlueprintMinutes(blueprint.duration)} onBlur={minutesChanged} type="number" />
                    <span>:</span>
                    <input className="text-black w-10" defaultValue={getBlueprintSeconds(blueprint.duration)} onBlur={secondsChanged} type="number" />
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
