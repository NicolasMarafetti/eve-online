import { useFitsContext } from "@/context/fits";
import { useStationFitsContext } from "@/context/stationFits";
import { useEffect, useState } from "react";

interface Props {
    fitId: string;
    stationId: string;
}

export default function StationFitItem({ fitId, stationId }: Props) {

    const { fits } = useFitsContext();
    const { refreshStationFits, stationFits } = useStationFitsContext();

    const [stationFitQuantity, setStationFitQuantity] = useState(0);

    useEffect(() => {
        const stationFit = stationFits.find(stationFit => stationFit.fitId === fitId && stationFit.stationId === stationId);

        if(stationFit) {
            setStationFitQuantity(stationFit.quantity);
        }
    }, [fitId, stationId, stationFits]);

    const fitQuantityChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantityNewValue = e.target.value;

        await fetch(`/api/station/${stationId}/fit/${fitId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: quantityNewValue
            })
        });

        await refreshStationFits();
    }

    const fit = fits.find(fit => fit.id === fitId);

    if(!fit) return null;

    return (
        <li className="my-2">
            <span className="mr-2">{fit.name}</span>
            <span className="mr-1">x</span>
            <input className="bg-transparent border px-1 w-14" onChange={fitQuantityChanged} type="number" value={stationFitQuantity} />
        </li>
    )
}