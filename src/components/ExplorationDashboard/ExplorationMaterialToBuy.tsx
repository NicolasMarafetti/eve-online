import { STUFF_TO_BUY, getStuffToBuy } from '@/utils/exploration';
import React from 'react'

export default function ExplorationMaterialToBuy() {

    const [stuffToBuyAtAmar, setStuffToBuyAtAmar] = React.useState<{ [materialId: number]: STUFF_TO_BUY }>({});

    return (
        <div>
            <h2 className="font-bold uppercase">Matériel nécessaire</h2>
            <h3>A acheter à Amarr</h3>
            <ul className="flex flex-wrap">
                {
                    Object.keys(stuffToBuyAtAmar).map((itemId) => {
                        const stuff = stuffToBuyAtAmar[parseInt(itemId)];
                        return (
                            <li className="border border-black p-1 m-1" key={itemId}>{stuff.name} x {stuff.quantity.toLocaleString()}</li>
                        )
                    })
                }
            </ul>
            <h3>A Acheter à la station Null Sec</h3>
        </div>
    )
}
