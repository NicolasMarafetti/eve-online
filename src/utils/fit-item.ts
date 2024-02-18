import { FitItem } from "@prisma/client";

export const getFitItems = async (): Promise<FitItem[]> => {
    const response = await fetch(`/api/fititem`);
    return response.json();
}