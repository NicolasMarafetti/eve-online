'use client'

import DashboardHeader from '@/components/DashboardHeader'
import { getCharacters } from '@/utils/characters';
import { Character } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';



export default function Characters() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [characterCreationModalOpen, setCharacterCreationModalOpen] = useState(false);
    const [characterCreationName, setCharacterCreationName] = useState('')

    useEffect(() => {
        getInitialCharacters();
    }, [])

    const createCharacterClicked = async () => {
        try {
            const response = await fetch('/api/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: characterCreationName
                })
            });
            const data = await response.json();
            setCharacters([...characters, data]);
            setCharacterCreationModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    const getInitialCharacters = async () => {
        try {
            const data = await getCharacters();
            setCharacters(data);
        } catch (error) {
            console.error(error);
        }
    }

    const hideCharacterCreationModal = () => {
        setCharacterCreationModalOpen(false);
    }

    const updateCharacterCreationName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCharacterCreationName(e.target.value);
    }

    const showCharacterCreationModal = () => {
        setCharacterCreationModalOpen(true);
    }

    return (
        <div className="bg-characters flex flex-col h-screen w-screen bg-cover bg-center text-black">
            <DashboardHeader />
            <main className="flex-1">
                <div className="bg-blue-500 flex flex-col items-center h-5/6 w-2/12">
                    <ul>
                        {characters.map((character) => (
                            <li className="flex flex-col items-center rounded-full p-2 text-white" key={character.id}>
                                <Image src="/images/characters/character.webp" width={81} height={78} alt="Character" />
                                <span>{character.name}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="relative text-center text-4xl" onClick={showCharacterCreationModal}>
                        <Image src="/images/characters/character.webp" width={81} height={78} alt="Character" />
                        <span className="absolute left-1/2 text-white top-1/2 transform -translate-x-1/2 -translate-y-1/2">+</span>
                    </button>
                </div>
            </main>
            {
                characterCreationModalOpen && (
                    <div className="absolute bg-white h-1/2 left-1/2 top-1/4 transform -translate-x-1/2 w-1/2">
                        <button className="absolute right-0 top-0" onClick={hideCharacterCreationModal}>X</button>
                        <h2 className="text-center text-4xl">Create a new character</h2>
                        <form onSubmit={createCharacterClicked}>
                            <label htmlFor="name">Name</label>
                            <input className="border border-black" onChange={updateCharacterCreationName} type="text" id="name" value={characterCreationName} />
                            <input className="border border-black" type="submit" value="Create" />
                        </form>
                    </div>
                )
            }
        </div>
    )
}
