import DashboardHeader from '@/components/Header/DashboardHeader'
import EquipementsToBuild from '@/components/EquipementsToBuild'
import ExplorationFits from '@/components/ExplorationDashboard/ExplorationFits'
import ShipsAttributionTable from '@/components/Production/ShipsAttributionTable'
import ShipsToBuild from '@/components/Production/ShipsToBuild'
import React from 'react'

export default function Production() {
    return (
        <div className="h-screen bg-production bg-cover">
            <DashboardHeader />
            <h1 className="bg-production-title-background bg-cover font-black text-center text-xl uppercase py-4">Gestion des objets à créer</h1>
            <section className="bg-gradient-to-b from-[#314872] to-[#0f192f] mx-auto w-6/12 mb-5 rounded-xl">
                <ExplorationFits />
            </section>
            <section className="bg-gradient-to-b from-[#314872] to-[#0f192f] mx-auto rounded-xl w-6/12 mb-5">
                <h2 className="bg-production-section-title-background bg-cover font-bold py-3 px-4 uppercase">Vaisseaux</h2>
                <div className="flex items-start justify-around">
                    <ShipsToBuild />
                    <ShipsAttributionTable />
                </div>
            </section>
            <section className="bg-gradient-to-b from-[#314872] to-[#0f192f] mx-auto rounded-xl w-6/12 mb-5">
                <h2 className="bg-production-section-title-background bg-cover font-bold py-3 px-4 uppercase">Equipements</h2>
                <EquipementsToBuild />
            </section>
        </div>
    )
}
