'use client'

import { getCharacters } from '@/utils/characters';
import { Character } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import ShipAttributionSelectionableData from './ShipAttributionSelectionableData';

export default function ShipsAttributionTable() {

    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        getInitialCharacters();
    }, [])

    const getInitialCharacters = async () => {
        try {
            const data = await getCharacters();
            setCharacters(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <table>
            <tbody>
                {
                    characters.map((character) => {
                        return (
                            <tr key={character.id}>
                                <td className="bg-[#151e2f] border-4 border-black p-2">{character.name}</td>
                                <ShipAttributionSelectionableData />
                                <ShipAttributionSelectionableData />
                                <ShipAttributionSelectionableData />
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
