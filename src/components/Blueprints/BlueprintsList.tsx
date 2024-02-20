import React from 'react'
import BlueprintItem from './BlueprintItem';
import { useBlueprintsContext } from '@/context/blueprints';

export default function BlueprintsList() {

    const { blueprints } = useBlueprintsContext();

    return (
        <ul>
            {blueprints.map(blueprint => <BlueprintItem key={blueprint.id} blueprintId={blueprint.id} />)}
        </ul>
    )
}
