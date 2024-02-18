import { Fit } from "@prisma/client";

export const getFits = async (): Promise<Fit[]> => {
    const response = await fetch(`/api/fits`);
    return response.json();
}