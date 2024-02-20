import { Blueprint } from "@prisma/client";

export const getBlueprints = async (): Promise<Blueprint[]> => {
    const response = await fetch(`/api/blueprints`);
    return response.json();
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