'use client'

import Image from 'next/image';
import React from 'react'

interface Props {
    simulationInProgress: boolean;
}

type Filter = {
    name: string;
    enabled: boolean;
    image: string;
};

type Filters = {
    [key: string]: Filter;
};

export default function ImprovementFilter({ simulationInProgress }: Props) {

    const [filters, setFilters] = React.useState<Filters>({
        armorTanking: {
            name: 'Armor Tanking',
            enabled: true,
            image: 'armor.png'
        },
        shieldTanking: {
            name: 'Shield Tanking',
            enabled: true,
            image: 'shield-tanking.png'
        },
        speed: {
            name: 'Speed',
            enabled: true,
            image: 'afterburner.png'
        },
    });

    const toggleFilter = (filterKey: string) => {
        if (simulationInProgress) return;

        setFilters(prevFilters => ({
            ...prevFilters,
            [filterKey]: {
                ...prevFilters[filterKey],
                enabled: !prevFilters[filterKey].enabled
            }
        }));
    }

    return (
        <div className="pl-4 pr-10">
            {
                Object.keys(filters).map((key, index) => {
                    const filter = filters[key];
                    return (
                        <div key={index} className="flex items-center h-20 py-1">
                            <div className="bg-[#13181c] mr-8 px-2 py-1 w-3/12 h-8/12">
                                <Image alt={filter.name} className="mr-4" src={`/images/${filter.image}`} width={40} height={40} />
                            </div>
                            <button className="bg-gradient-to-r from-[#131518] h-full to-transparent px-2 py-4 flex flex-1 items-center justify-between" onClick={() => toggleFilter(key)}>
                                <p className="text-gray-500">{filter.name}</p>
                                <div className={`${filter.enabled ? "bg-green-500" : "bg-gray-500"} w-4 h-4 rounded-full`}></div>
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}
