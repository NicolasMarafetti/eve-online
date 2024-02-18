import React from 'react'
import { FaTimes } from 'react-icons/fa';

interface Props {
    closeModal: () => void;
    fitAdded: () => void;
}

export default function AddFitModal({ closeModal, fitAdded }: Props) {

    const [addFitForm, setAddFitForm] = React.useState({ name: '' });

    const addFitNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddFitForm({ ...addFitForm, name: e.target.value });
    }

    const addFitSubmited = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch('/api/fits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addFitForm)
        });
        fitAdded();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 relative rounded-xl text-black">
                <h2 className="text-center">Ajouter un fit</h2>
                <form onSubmit={addFitSubmited}>
                    <div className="flex flex-col justify-center">
                        <label htmlFor="name">Nom</label>
                        <input className="border border-black" onChange={addFitNameChanged} type="text" id="name" value={addFitForm.name} />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
                <button className="absolute top-2 right-2" onClick={closeModal}><FaTimes /></button>
        </div>
        </div >
    )
}
