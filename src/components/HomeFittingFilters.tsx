'use client'

import React from 'react'
import DamageReceivedFilter from './DamageReceivedFilter';
import ImprovementFilter from './ImprovementFilter';
import ShipFilter from './ShipFilter';

interface Props {
    simulationInProgress: boolean;
}

export default function HomeFittingFilters({ simulationInProgress }: Props) {
    return (
        <div className="bg-black/90 h-full py-5 w-[30vw]">
            <h2 className="mb-10 text-gray-500 text-center text-4xl">Filters</h2>
            <ShipFilter />
            <DamageReceivedFilter simulationInProgress={simulationInProgress} />
            <ImprovementFilter simulationInProgress={simulationInProgress} />
        </div>
    )
}
