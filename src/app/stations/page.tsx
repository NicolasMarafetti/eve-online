'use client';

import DashboardHeader from '@/components/Header/DashboardHeader'
import StationsList from '@/components/Stations/StationsList';
import { FIT } from '@/const/fits';
import { getFits } from '@/utils/fit';
import { getStations } from '@/utils/stations'
import { Station } from '@prisma/client';
import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa';

export default function Stations() {

    const [addModalOpen, setAddModalOpen] = React.useState(false);
    const [addStationForm, setAddStationForm] = React.useState({ name: '' });
    const [fits, setFits] = React.useState<FIT[]>([]);
    const [stations, setStations] = React.useState<Station[]>([])

    useEffect(() => {
        getInitialFits();
        getInitialStations();
    }, [])

    const addClicked = () => {
        setAddModalOpen(true);
    }

    const addStationNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddStationForm({ ...addStationForm, name: e.target.value });
    }

    const addStationSubmited = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch('/api/stations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addStationForm)
        });
        await getInitialStations();
        setAddModalOpen(false);
    }

    const getInitialFits = async () => {
        setFits(getFits());
    }

    const getInitialStations = async () => {
        setStations(await getStations());
    }

    return (
        <div className="h-screen bg-production bg-cover">
            <DashboardHeader />
            <h1 className="bg-production-title-background bg-cover font-black text-center text-xl uppercase py-4">Stations</h1>
            <section className="bg-gradient-to-b from-[#314872] to-[#0f192f] mx-auto rounded-xl w-6/12 mb-5">
                <h2 className="bg-production-section-title-background bg-cover font-bold py-3 px-4 uppercase">Stations</h2>
                <StationsList getInitialStations={getInitialStations} fits={fits} stations={stations} />
                
                <button onClick={addClicked}>Ajouter</button>
            </section>
            {
                addModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 relative rounded-xl text-black">
                        <h2 className="text-center">Ajouter une station</h2>
                        <form onSubmit={addStationSubmited}>
                            <div className="flex flex-col">
                                <label htmlFor="name">Nom</label>
                                <input className="border border-black" onChange={addStationNameChanged} type="text" id="name" value={addStationForm.name} />
                            </div>
                            <button type="submit">Ajouter</button>
                        </form>
                        <button className="absolute top-2 right-2" onClick={() => { setAddModalOpen(false) }}><FaTimes /></button>
                    </div>
                </div>
            }
        </div>
    )
}
