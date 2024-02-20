import { useItemsContext } from '@/context/items'
import React from 'react'

interface Props {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default function ItemSelect({ onChange, value }: Props) {

    const { items } = useItemsContext();

    return (
        <select className="border border-black" onChange={onChange} value={value}>
            <option value="">--Choisir un objet--</option>
            {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
    )
}
