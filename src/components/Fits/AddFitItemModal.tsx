import { getItems } from '@/utils/item';
import { Item } from '@prisma/client';
import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa';

interface Props {
    closeModal: () => void;
    fitId: string;
    reloadFits: () => void;
}

export default function AddFitItemModal({ closeModal, fitId, reloadFits }: Props) {

    const [addFitForm, setAddFitForm] = React.useState({ item: '', quantity: 1 });
    const [items, setItems] = React.useState<Item[]>([]);

    useEffect(() => {
        const getInitialItems = async () => {
            const items = await getItems();
            setItems(items);
            setAddFitForm((prevForm) => ({ ...prevForm, item: items[0].id }));
        }
        getInitialItems();
    }, [])

    const addFitItemSubmited = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch('/api/fititem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fitId: fitId,
                itemId: addFitForm.item,
                quantity: addFitForm.quantity            
            })
        });
        await reloadFits();
        closeModal();
    }

    const itemChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAddFitForm((prevForm) => ({ ...prevForm, item: e.target.value }));
    }

    const quantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddFitForm((prevForm) => ({ ...prevForm, quantity: parseInt(e.target.value) }));
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 relative rounded-xl text-black">
                <h2 className="text-center">Ajouter un objet au fit</h2>
                <form onSubmit={addFitItemSubmited}>
                    <div className="flex flex-col justify-center">
                        <label htmlFor="name">Objet</label>
                        <select className="border border-black" onChange={itemChanged} value={addFitForm.item}>
                            {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantité</label>
                        <input className="border border-black" onChange={quantityChanged} type="number" value={addFitForm.quantity} id="quantity" />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
                <button className="absolute top-2 right-2" onClick={closeModal}><FaTimes /></button>
            </div>
        </div >
    )
}
