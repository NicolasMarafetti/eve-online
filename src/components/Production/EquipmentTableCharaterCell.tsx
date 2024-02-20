import { useCharactersContext } from '@/context/characters';
import { useProductionsContext } from '@/context/productions';
import React from 'react'

interface Props {
    itemId: string;
}

export default function EquipmentTableCharaterCell({ itemId }: Props) {

    const { characters } = useCharactersContext();
    const { productions, refreshProductions } = useProductionsContext();

    const characterChanged = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const characterId = event.target.value;
        await fetch(`/api/productions`, {
            method: 'PUT',
            body: JSON.stringify({ itemId, characterId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        refreshProductions();
    };

    const production = productions.find(production => production.itemId === itemId);
    const characterSelected = (production && production.characterId) ? production.characterId : '';

    return (
        <td className="px-1">
            <select className="text-black" onChange={characterChanged} value={characterSelected}>
                <option value="">Select a character</option>
                {
                    characters.map(character => (
                        <option key={character.id} value={character.id}>{character.name}</option>
                    ))

                }
            </select>
        </td>
    )
}
