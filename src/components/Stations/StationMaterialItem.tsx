import { useItemsContext } from "@/context/items";
import { useEffect, useState } from "react";

interface Props {
    itemId: string;
    stationId: string;
}

export default function StationMaterialItem({ itemId, stationId }: Props) {

    const { items } = useItemsContext();

    const item = items.find(item => item.id === itemId);

    if (!item) return null;

    return (
        <li className="my-2">
            <span className="mr-2">{item.name} x </span>
        </li>
    )
}