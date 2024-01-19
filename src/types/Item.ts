import { ItemPrice } from "./ItemPrice";

export type Item = {
    id: number;
    name: string;
    ownedQuantity: number;
    priceObjects: ItemPrice[];
}