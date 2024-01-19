import { Station } from "./Station"

export type RewardItem = {
    itemId: number,
    name: string,
    quantity: number,
    lpCost: number,
    iskCost: number,
    iskPerLp: number,
    ownedQuantity: number,
    quantityToBuy: number,
    mySellPrice: number,
    itemPrice: number,
    requiredItems: {
        id: number,
        quantity: number,
        name: string,
        price: number
    }[]

}

export type RewardTableItem = {
    getHomeData: any,
    rewards: RewardItem[],
    station: undefined | Station
}