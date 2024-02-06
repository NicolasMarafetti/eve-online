import { FITS } from '@/const/fits'
import React from 'react'

export default function ExplorationFits() {
    return (
        <div className="bg-gradient-to-b from-white mx-2 to-gray-400 p-4 rounded-xl">
            <h2 className="font-bold uppercase">Fits</h2>
            <ul>
                {
                    FITS.map((fit, index) => {
                        return (
                            <li key={index}>
                                <p className="whitespace-nowrap">{fit.name}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
