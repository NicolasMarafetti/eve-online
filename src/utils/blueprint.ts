import { Blueprint } from "@prisma/client";

export const getBlueprints = async (): Promise<Blueprint[]> => {
    const response = await fetch(`/api/blueprints`);
    return response.json();
}

export const getBlueprintHours = (duration: number): number => {
    return Math.floor(duration / 3600);
}

export const getBlueprintMinutes = (duration: number): number => {
    return Math.floor((duration % 3600) / 60);
}

export const getBlueprintSeconds = (duration: number): number => {
    return Math.floor(duration % 60);
}

export const getBlueprintsToProduces = (stationBlueprints: { blueprintId: string, quantity: number }[]): { [blueprintId: string]: number } => {
    let blueprintsToProduceTmp: { [blueprintId: string]: number } = {};
    stationBlueprints.forEach(stationBlueprint => {
        if (stationBlueprint.quantity > 0) {
            if (blueprintsToProduceTmp[stationBlueprint.blueprintId]) {
                blueprintsToProduceTmp[stationBlueprint.blueprintId] += stationBlueprint.quantity;
            } else {
                blueprintsToProduceTmp[stationBlueprint.blueprintId] = stationBlueprint.quantity;
            }
        }
    });
    return blueprintsToProduceTmp;
}