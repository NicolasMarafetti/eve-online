import { BlueprintMaterial, FitItem } from "@prisma/client";

export const getBlueprintMaterials = async (): Promise<BlueprintMaterial[]> => {
    const response = await fetch(`/api/blueprintMaterials`);
    return response.json();
}