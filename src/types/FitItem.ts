import { Fit, Item } from "@prisma/client";

export interface FitItemWithFitAndItems {
    id: string;
    quantity: number;
    fit: Fit;
    item: Item;
}