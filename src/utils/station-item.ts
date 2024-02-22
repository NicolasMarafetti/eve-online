import { Production, StationItem } from "@prisma/client";

export const getStationItems = async () => {
    return await fetch(`/api/stations/items`).then(res => res.json());
}

export const searchItemQuantityInStation = (itemId: string, productions: Production[], stationItems: StationItem[]): number => {
    const production = productions.find(production => production.itemId === itemId);

    if (!production) return 0;

    return stationItems.find(stationItem => stationItem.itemId === itemId && stationItem.stationId === production.stationId)?.quantity || 0;
}

export const updateStationItemQuantity = async (stationId: string, itemId: string, quantity: number) => {
    await fetch(`/api/station/${stationId}/items/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    });
}