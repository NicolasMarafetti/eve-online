'use client';

import DashboardHeader from '@/components/Header/DashboardHeader'
import AddFitModal from '@/components/Fits/AddFitModal';
import FitsList from '@/components/Fits/FitsList';
import { getFits } from '@/utils/fit';
import { Fit, FitItem } from '@prisma/client';
import React, { useEffect } from 'react'
import { getFitItems } from '@/utils/fit-item';

export default function Fits() {

    const [addModalOpen, setAddModalOpen] = React.useState(false);
    
    const [fits, setFits] = React.useState<Fit[]>([]);

    useEffect(() => {
        getInitialFits();
    }, [])

    const addClicked = () => {
        setAddModalOpen(true);
    }

    const closeModal = () => {
        setAddModalOpen(false);
    }

    const getInitialFits = async () => {
        setFits(await getFits());
    }

    const fitAdded = () => {
        setAddModalOpen(false);
        getInitialFits();
    }

    return (
        <div className="h-screen bg-production bg-cover">
            <DashboardHeader />
            <h1 className="bg-production-title-background bg-cover font-black text-center text-xl uppercase py-4">Fits</h1>
            <section className="bg-gradient-to-b from-[#314872] to-[#0f192f] mx-auto rounded-xl w-6/12 mb-5">
                <h2 className="bg-production-section-title-background bg-cover font-bold py-3 px-4 uppercase">Fits</h2>
                <FitsList reloadFits={getInitialFits} fits={fits} />
                
                <button onClick={addClicked}>Ajouter</button>
            </section>
            {addModalOpen && <AddFitModal closeModal={closeModal} fitAdded={fitAdded} />}
        </div>
    )
}
