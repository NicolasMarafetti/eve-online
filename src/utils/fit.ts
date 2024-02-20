import { Fit } from "@prisma/client";

export const getFits = async (): Promise<Fit[]> => {
    const response = await fetch(`/api/fits`);
    return response.json();
}

export const getFitsToProduces = (stationFits: { fitId: string, quantity: number }[]): { [fitId: string]: number } => {
    let fitsToProduceTmp: { [fitId: string]: number } = {};
    stationFits.forEach(stationFit => {
        if (stationFit.quantity > 0) {
            if (fitsToProduceTmp[stationFit.fitId]) {
                fitsToProduceTmp[stationFit.fitId] += stationFit.quantity;
            } else {
                fitsToProduceTmp[stationFit.fitId] = stationFit.quantity;
            }
        }
    });
    return fitsToProduceTmp;
}