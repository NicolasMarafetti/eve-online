import { FitItemWithFitAndItems } from '@/types/FitItem';
import { FitItem } from '@prisma/client';
import { isArray } from 'lodash';
import React, { useEffect } from 'react'

interface Props {
    fitId: string;
}

export default function FitItems({ fitId }: Props) {

    const [fitItems, setFitItems] = React.useState<FitItemWithFitAndItems[]>([]);

    useEffect(() => {
        const getFitItems = async () => {
            const response = await fetch(`/api/fititem/${fitId}`);
            const data = await response.json();

            if (!isArray(data)) return;

            setFitItems(data);
        }
        getFitItems();
    }, [fitId]);

    return (
        <ul>
            {fitItems.map(fitItem => <li key={fitItem.id}>{fitItem.item.name} x {fitItem.quantity}</li>)}
        </ul>
    )
}
