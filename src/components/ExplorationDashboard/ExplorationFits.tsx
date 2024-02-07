import { EXPORATION_STUFF_PER_BASE } from '@/const/explorationStuffPerBase';
import { FITS } from '@/const/fits'
import React from 'react'

export default function ExplorationFits() {
    return (
        <div className="pb-4 text-white">
            <h2 className="bg-production-section-title-background bg-cover font-bold py-3 px-4 uppercase">Fits</h2>
            <ul className="flex px-4">
                {
                    EXPORATION_STUFF_PER_BASE.map((exploration_fit, index) => {
                        const fit = FITS.find(fit => fit.id === exploration_fit.fitId);
                        if (!fit) return null;
                        return (
                            <li className="flex flex-col items-center w-60" key={index}>
                                <p className="whitespace-nowrap">{fit.name}</p>
                                <p>x {exploration_fit.quantity}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
