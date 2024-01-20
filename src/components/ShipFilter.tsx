'use client'

import { useFiltersContext } from '@/context/filters';
import React, { useState } from 'react'

export default function ShipFilter() {

    const { setAddingShip } = useFiltersContext();
    const [selectedOption, setSelectedOption] = useState('');

    const addShipClicked = () => {
        setAddingShip(true);
    }

    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
        if (event.target.value === 'add') {
            addShipClicked();
        }
    }


    return (
        <div className="flex flex-col m-auto pb-[5vh] w-40">
            <label className="text-gray-500" htmlFor="ship_name">Ship</label>
            <select name="ship_name" value={selectedOption} onChange={handleChange} id="ship_name">
                <option value="" disabled>Select an option</option>
                <option value="add">+ Add</option>
            </select>
        </div>
    )
}
