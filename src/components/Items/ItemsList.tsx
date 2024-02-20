import { useItemsContext } from '@/context/items';
import React from 'react'
import { FaTimes } from 'react-icons/fa'

export default function ItemsList() {

    const { items, refreshItems } = useItemsContext();

    const deleteItem = async (id: string) => {
        await fetch(`/api/items/${id}`, {
            method: 'DELETE'
        });
        refreshItems();
    }

    return (
        <ul>
            {
                items.map(item => (
                    <li key={item.id} className="border border-black px-4 py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-white">{item.name}</p>
                            <button onClick={() => { deleteItem(item.id) }}><FaTimes /></button>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
