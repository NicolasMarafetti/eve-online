import React from 'react'
import DamageReceivedFilter from './DamageReceivedFilter';
import ImprovementFilter from './ImprovementFilter';

interface Props {
    simulationInProgress: boolean;
}

export default function HomeFittingFilters({ simulationInProgress }: Props) {
    return (
        <div className="bg-black/90 h-full py-5 w-[30vw]">
            <h2 className="mb-10 text-gray-500 text-center text-4xl">Filters</h2>
            <div className="flex flex-col m-auto pb-[5vh] w-40">
                <label className="text-gray-500" htmlFor="ship_name">Ship</label>
                <input type="text" name="ship_name" id="ship_name" />
            </div>
            <DamageReceivedFilter simulationInProgress={simulationInProgress} />
            <ImprovementFilter simulationInProgress={simulationInProgress} />
        </div>
    )
}
