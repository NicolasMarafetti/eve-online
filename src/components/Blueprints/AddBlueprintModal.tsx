import React from 'react'
import { FaTimes } from 'react-icons/fa';
import ItemSelect from '../Items/ItemSelect';
import { useBlueprintsContext } from '@/context/blueprints';

interface Props {
    closeModal: () => void;
}

export default function AddBlueprintModal({ closeModal }: Props) {

    const { refreshBlueprints } = useBlueprintsContext();

    const [addBlueprintForm, setAddBlueprintForm] = React.useState({
        itemCreatedId: "",
        quantity: 1
    });

    const addBlueprintSubmited = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch('/api/blueprints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addBlueprintForm)
        });
        refreshBlueprints();
        closeModal();
    }

    const itemChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAddBlueprintForm({ ...addBlueprintForm, itemCreatedId: e.target.value });
    }

    const quantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddBlueprintForm({ ...addBlueprintForm, quantity: parseInt(e.target.value) });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 relative rounded-xl text-black">
                <h2 className="text-center">Ajouter un blueprint</h2>
                <form onSubmit={addBlueprintSubmited}>
                    <div className="flex flex-col justify-center">
                        <label htmlFor="name">Objet crée</label>
                        <ItemSelect onChange={itemChanged} value={addBlueprintForm.itemCreatedId} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <label htmlFor="name">Quantité</label>
                        <input className="border border-black" onChange={quantityChanged} type="text" id="name" value={addBlueprintForm.quantity} />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
                <button className="absolute top-2 right-2" onClick={closeModal}><FaTimes /></button>
            </div>
        </div >
    )
}
