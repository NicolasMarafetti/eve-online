import { useItemsContext } from "@/context/items";

interface Props {
    ressourceId: string;
    quantity: number;
}

export default function StationRessourceNeeded({ quantity, ressourceId }: Props) {

    const { items } = useItemsContext();

    const item = items.find(item => item.id === ressourceId);
    if (!item) return null;

    return (
        <li className="my-2">
            <span className="mr-2">{item.name} x {quantity}</span>
        </li>
    )
}