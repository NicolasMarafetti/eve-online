import { Fit, FitItem } from '@prisma/client'
import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa';
import AddFitItemModal from './AddFitItemModal';
import FitItems from './FitItems';

interface Props {
    fit: Fit;
    reloadFits: () => void;
}

export default function FitItem({ fit, reloadFits }: Props) {

    const [addItemModalOpen, setAddItemModalOpen] = React.useState(false);
    

    const addItemClicked = () => {
        setAddItemModalOpen(true);
    }

    const deleteFit = async (id: string) => {
        await fetch(`/api/fits/${id}`, {
            method: 'DELETE'
        });
        reloadFits();
    }

    return (
        <li key={fit.id} className="border border-black px-4 py-2">
            <div className="flex fits-center justify-between">
                <p className="text-white">{fit.name}</p>
                <button onClick={() => { deleteFit(fit.id) }}><FaTimes /></button>
            </div>
            <FitItems fitId={fit.id} />
            <button className="text-sm text-gray-500 border border-white p-2" onClick={addItemClicked}>Ajouter un objet</button>

            {addItemModalOpen && <AddFitItemModal closeModal={() => setAddItemModalOpen(false)} fitId={fit.id} reloadFits={reloadFits} />}
        </li>
    )
}
