'use client'

import { Character } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface CharacterContextType {
    characters: Character[];
}

const CharactersContext = createContext<CharacterContextType>({
    characters: []
});

export const CharactersProvider = ({ children }: any) => {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        refreshCharacters();
    }, [])

    const refreshCharacters = async () => {
        const res = await fetch('/api/characters');
        const characters = await res.json();
        setCharacters(characters);
    }

    return (
        <CharactersContext.Provider
            value={{
                characters
            }}
        >
            {children}
        </CharactersContext.Provider>
    );
}

export const useCharactersContext = () => {
    const context = useContext(CharactersContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
