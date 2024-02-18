'use client';

import DashboardHeader from '@/components/Header/DashboardHeader'
import AddItemModal from '@/components/Items/AddItemModal';
import ItemsList from '@/components/Items/ItemsList';
import { getItems } from '@/utils/item';
import { Item } from '@prisma/client';
import React, { useEffect } from 'react'

export default function Objets() {

    const [addModalOpen, setAddModalOpen] = React.useState(false);
    
    const [items, setItems] = React.useState<Item[]>([]);

    useEffect(() => {
        getInitialItems();
    }, [])

    const addClicked = () => {
        setAddModalOpen(true);
    }

    const closeModal = () => {
        setAddModalOpen(false);
    }

    const getInitialItems = async () => {
        setItems(await getItems());
    }

    const itemAdded = () => {
        setAddModalOpen(false);
        getInitialItems();
    }

    return (
        <div className="h-screen bg-production bg-cover">
            <DashboardHeader />
            <h1 className="bg-production-title-background bg-cover font-black text-center text-xl uppercase py-4">Objets</h1>
            <section className="bg-gradient-to-b from-[#314872] to-[#0f192f] mx-auto rounded-xl w-6/12 mb-5">
                <h2 className="bg-production-section-title-background bg-cover font-bold py-3 px-4 uppercase">Objets</h2>
                <ItemsList getInitialItems={getInitialItems} items={items} />
                
                <button onClick={addClicked}>Ajouter</button>
            </section>
            {addModalOpen && <AddItemModal closeModal={closeModal} itemAdded={itemAdded} />}
        </div>
    )
}
