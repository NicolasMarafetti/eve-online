import { ALLIANCE_STATIONS, STATION } from "@/const/alliance-stations";
import { EXPLORATION_BLUEPRINTS } from "@/const/exploration-blueprints";
import { EXPLORATIONS_MATERIALS } from "@/const/exploration-materials";
import { EXPORATION_STUFF_PER_BASE } from "@/const/explorationStuffPerBase";
import { FITS } from "@/const/fits";
import { cloneDeep } from "lodash";

export type STUFF_TO_BUY = {
    name: string;
    quantity: number;
}

export const calculateAmarrBuyCosts = () => {
    return 1000000;
}

export const calculateNSBuyCosts = () => {
    return 1000000;
}

export const countAllianceStationsNeedingExplorationStuff = () => {
    return ALLIANCE_STATIONS.filter(station => station.needExplorationShips).length;
}

export const getFitItems = (fitId: number) => {
    return FITS.find(fit => fit.id === fitId)?.items || [];
}

export const getFitMaterialRequired = (fitId: number): { [materialId: number]: { quantity: number } } => {
    let materialsRequired: { [itemId: number]: { quantity: number } } = {};

    const fitItems = getFitItems(fitId);

    fitItems.forEach((item) => {
        const itemMaterialRequired = getItemMaterialRequired(item.itemId);

        if (itemMaterialRequired) {
            for (let itemId in itemMaterialRequired) {
                if (materialsRequired[itemId]) {
                    materialsRequired[itemId].quantity += itemMaterialRequired[itemId];
                } else {
                    materialsRequired[itemId] = {
                        quantity: itemMaterialRequired[itemId]
                    }
                }
            }
        }
    })

    return materialsRequired;
}

const getItemMaterialRequired = (itemId: number): { [itemId: number]: number } | null => {
    const itemBlueprint = EXPLORATION_BLUEPRINTS.find(blueprint => blueprint.itemId === itemId);

    if (!itemBlueprint) return null;

    let materialsRequired: { [itemId: number]: number } = {};

    itemBlueprint.materials.forEach((material) => {
        materialsRequired[material.itemId] = material.quantity;
    })

    return materialsRequired;
}

export const getStuffToBuy = (multiplier: number): { [materialId: number]: STUFF_TO_BUY } => {
    let materialToBuy: { [materialId: number]: STUFF_TO_BUY } = {

    };

    let materialOwned: { [materialId: number]: STUFF_TO_BUY } = {

    };

    // Searching Material to Buy
    ALLIANCE_STATIONS.forEach((station) => {
        if (station.needExplorationShips) {
            EXPORATION_STUFF_PER_BASE.forEach((stuff) => {
                if (stuff.fitId) {
                    const fitQuantityRequired = stuff.quantity;
                    const fitQuantityInStationInventory = searchFitQuantityInStationInventory(station, stuff.fitId);

                    if (fitQuantityInStationInventory < fitQuantityRequired * multiplier) {
                        const fitMaterials = getFitMaterialRequired(stuff.fitId);

                        for (let materialId in fitMaterials) {
                            if (materialToBuy[materialId]) {
                                materialToBuy[materialId].quantity += fitMaterials[materialId].quantity * (fitQuantityRequired * multiplier - fitQuantityInStationInventory);
                            } else {
                                materialToBuy[materialId] = {
                                    name: EXPLORATIONS_MATERIALS.find(material => material.id === Number(materialId))?.name || "",
                                    quantity: fitMaterials[materialId].quantity * (fitQuantityRequired * multiplier - fitQuantityInStationInventory)
                                }
                            }
                        }
                    }
                }
            })
        }
    })

    // Searching Material Owned
    ALLIANCE_STATIONS.forEach((station) => {
        station.inventory.forEach((inventoryItem) => {
            if ('materialId' in inventoryItem) {
                if (materialOwned[inventoryItem.materialId]) {
                    materialOwned[inventoryItem.materialId].quantity += inventoryItem.quantity;
                } else {
                    materialOwned[inventoryItem.materialId] = {
                        name: EXPLORATIONS_MATERIALS.find(material => material.id === Number(inventoryItem.materialId))?.name || "",
                        quantity: inventoryItem.quantity
                    }
                }
            }
        })
    })

    // I remove materialOwned from materialToBuy
    for (let materialId in materialToBuy) {
        if (materialOwned[materialId]) {
            materialToBuy[materialId].quantity -= materialOwned[materialId].quantity;

            if(materialToBuy[materialId].quantity < 0) {
                delete materialToBuy[materialId];
            }
        }
    }

    return materialToBuy;
}

const searchFitQuantityInStationInventory = (station: STATION, fitId: number) => {
    const inventoryItem = station.inventory.find(inventoryItem => inventoryItem.fitId === fitId);

    return inventoryItem ? inventoryItem.quantity : 0;
}