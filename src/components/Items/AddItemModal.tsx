import React from 'react'
import { FaTimes } from 'react-icons/fa';

interface Props {
    closeModal: () => void;
    itemAdded: () => void;
}

export default function AddItemModal({ closeModal, itemAdded }: Props) {

    const [addItemForm, setAddItemForm] = React.useState({ name: '' });

    const addItemNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddItemForm({ ...addItemForm, name: e.target.value });
    }

    const addItemSubmited = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addItemForm)
        });
        itemAdded();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 relative rounded-xl text-black">
                <h2 className="text-center">Ajouter une station</h2>
                <form onSubmit={addItemSubmited}>
                    <div className="flex flex-col">
                        <label htmlFor="name">Nom</label>
                        <input className="border border-black" onChange={addItemNameChanged} type="text" id="name" value={addItemForm.name} />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
                <button className="absolute top-2 right-2" onClick={closeModal}><FaTimes /></button>
        </div>
        </div >
    )
}
