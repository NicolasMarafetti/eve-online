'use client'

import DashboardHeader from '@/components/Header/DashboardHeader';
import ExplorationCosts from '@/components/ExplorationDashboard/ExplorationCosts';
import ExplorationFits from '@/components/ExplorationDashboard/ExplorationFits';
import ExplorationInventory from '@/components/ExplorationDashboard/ExplorationInventory';
import ExplorationMaterialToBuy from '@/components/ExplorationDashboard/ExplorationMaterialToBuy';
import ExplorationRessourcesGraph from '@/components/ExplorationDashboard/ExplorationRessourcesGraph';
import ExplorationStuffPerBase from '@/components/ExplorationDashboard/ExplorationStuffPerBase'
import React from 'react'

export default function ExplorationDashboard() {
    return (
        <div className="bg-exploration-dashboard h-screen w-screen bg-cover bg-center text-black">
            <DashboardHeader />
            <section className="absolute bg-gradient-to-b from-white to-gray-400 flex left-1/2 top-20 transform -translate-x-1/2">
                <ExplorationMaterialToBuy />
                <div className="bg-blue-500 my-3 w-[1px]"></div>
                <ExplorationRessourcesGraph />
            </section>
            <section className="absolute flex items-start left-1/2 bottom-0 transform -translate-x-1/2">
                <ExplorationCosts />
                <ExplorationInventory />
                <ExplorationStuffPerBase />
            </section>
        </div>
    )
}
