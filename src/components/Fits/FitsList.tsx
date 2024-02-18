import { Fit } from '@prisma/client';
import React from 'react'
import FitItem from './FitItem';

interface Props {
    reloadFits: () => void;
    fits: Fit[];
}

export default function FitsList({ fits, reloadFits }: Props) {
    return (
        <ul>
            {fits.map(fit => <FitItem key={fit.id} fit={fit} reloadFits={reloadFits} />)}
        </ul>
    )
}
