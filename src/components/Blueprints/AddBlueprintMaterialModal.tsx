import { useBlueprintMaterialsContext } from '@/context/blueprintMaterials';
import React from 'react'
import { FaTimes } from 'react-icons/fa';
import ItemSelect from '../Items/ItemSelect';

interface Props {
    closeModal: () => void;
    blueprintId: string;
}

export default function AddBlueprintMaterialModal({ closeModal, blueprintId }: Props) {

    const { refreshBlueprintMaterials } = useBlueprintMaterialsContext();

    const [addBlueprintForm, setAddBlueprintForm] = React.useState({ itemId: '', quantity: 1 });

    const addBlueprintMaterialSubmited = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch('/api/blueprintMaterials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                blueprintId: blueprintId,
                itemId: addBlueprintForm.itemId,
                quantity: addBlueprintForm.quantity            
            })
        });
        await refreshBlueprintMaterials();
        closeModal();
    }

    const itemChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAddBlueprintForm((prevForm) => ({ ...prevForm, itemId: e.target.value }));
    }

    const quantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddBlueprintForm((prevForm) => ({ ...prevForm, quantity: parseInt(e.target.value) }));
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 relative rounded-xl text-black">
                <h2 className="text-center">Ajouter un objet au blueprint</h2>
                <form onSubmit={addBlueprintMaterialSubmited}>
                    <div className="flex flex-col justify-center">
                        <label htmlFor="name">Matériel</label>
                        <ItemSelect onChange={itemChanged} value={addBlueprintForm.itemId} />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantité</label>
                        <input className="border border-black" onChange={quantityChanged} type="number" value={addBlueprintForm.quantity} id="quantity" />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
                <button className="absolute top-2 right-2" onClick={closeModal}><FaTimes /></button>
            </div>
        </div >
    )
}
