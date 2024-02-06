import { EXPORATION_STUFF_PER_BASE } from '@/const/explorationStuffPerBase'
import { FITS } from '@/const/fits';
import React from 'react'

export default function ExplorationStuffPerBase() {
    return (
        <div className="bg-gradient-to-b from-white mx-2 to-gray-400 p-4 rounded-xl">
            <h2 className="font-bold uppercase">Voulu par base</h2>
            {
                EXPORATION_STUFF_PER_BASE.map((stuff, index) => {
                    const fit = FITS.find(fit => fit.id === stuff.fitId);
                    if(!fit) return null;
                    return (
                        <div className="" key={index}>
                            <h3 className="whitespace-nowrap">{fit.name} : {stuff.quantity}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}
