'use client';

import DashboardHeader from '@/components/Header/DashboardHeader'
import AddBlueprintModal from '@/components/Blueprints/AddBlueprintModal';
import BlueprintsList from '@/components/Blueprints/BlueprintsList';
import React from 'react'

export default function Blueprints() {

    const [addModalOpen, setAddModalOpen] = React.useState(false);

    const addClicked = () => {
        setAddModalOpen(true);
    }

    const closeModal = () => {
        setAddModalOpen(false);
    }

    return (
        <div className="h-screen bg-production bg-cover overflow-y-auto">
            <DashboardHeader />
            <h1 className="bg-production-title-background bg-cover font-black text-center text-xl uppercase py-4">Blueprints</h1>
            <section className="bg-gradient-to-b from-[#314872] to-[#0f192f] mx-auto rounded-xl w-6/12 mb-5">
                <h2 className="bg-production-section-title-background bg-cover font-bold py-3 px-4 uppercase">Blueprints</h2>
                <BlueprintsList />

                <button onClick={addClicked}>Ajouter</button>
            </section>
            {addModalOpen && <AddBlueprintModal closeModal={closeModal} />}
        </div>
    )
}
