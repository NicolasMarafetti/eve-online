import { ALLIANCE_STATIONS, STATION } from "@/const/alliance-stations";
import { EXPLORATION_BLUEPRINTS } from "@/const/exploration-blueprints";
import { EXPLORATION_ITEMS, ITEM } from "@/const/exploration-items";
import { EXPLORATIONS_MATERIALS } from "@/const/exploration-materials";
import { EXPORATION_STUFF_PER_BASE } from "@/const/explorationStuffPerBase";
import { FITS } from "@/const/fits";
import { Ship } from "@/types/Ship";
import { FitItem, StationFit } from "@prisma/client";
import { getFitsToProduces } from "./fit";

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

export const getStuffForFit = (fitId: string, fitItems: FitItem[]): { [itemId: string]: number } | null => {
    let items: { [itemId: string]: number } = {};

    fitItems.forEach((fitItem) => {
        if (fitItem.fitId === fitId) {
            if (items[fitItem.itemId]) {
                items[fitItem.itemId] += fitItem.quantity;
            } else {
                items[fitItem.itemId] = fitItem.quantity;
            }
        }
    })

    return items;
}

export const getEquipementsToBuild = (fitItems: FitItem[], stationFits: StationFit[]): { [stuffId: string]: number } => {
    const equipements: { [stuffId: string]: number } = {};

    const fitsToProduct = getFitsToProduces(stationFits);

    for (let fitId in fitsToProduct) {
        const stuffs = getStuffForFit(fitId, fitItems);

        if (stuffs) {
            for (let stuffId in stuffs) {
                if (equipements[stuffId]) {
                    equipements[stuffId] += stuffs[stuffId] * fitsToProduct[fitId];
                } else {
                    equipements[stuffId] = stuffs[stuffId] * fitsToProduct[fitId];
                }
            }
        }
    }

    return equipements;
}

export const getFitsItems = async (): Promise<FitItem[]> => {
    const response = await fetch('/api/fititem');
    return response.json();
}

export const getFitMaterialRequired = async (fitId: string): Promise<{ [materialId: string]: { quantity: number } }> => {
    let materialsRequired: { [itemId: string]: { quantity: number } } = {};

    const fitsItems = await getFitsItems();

    fitsItems.forEach((fitItem) => {
        const itemMaterialRequired = getItemMaterialRequired(fitItem.itemId);

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

const getItemMaterialRequired = (itemId: string): { [itemId: string]: number } | null => {
    const itemBlueprint = EXPLORATION_BLUEPRINTS.find(blueprint => blueprint.itemId === itemId);

    if (!itemBlueprint) return null;

    let materialsRequired: { [itemId: number]: number } = {};

    itemBlueprint.materials.forEach((material) => {
        materialsRequired[material.itemId] = material.quantity;
    })

    return materialsRequired;
}

export const getShipForFit = (fitId: string): Ship | null => {
    const fit = FITS.find(fit => fit.id === fitId);

    if (!fit) return null;

    const item = EXPLORATION_ITEMS.find(item => item.id === fit.ship.itemId);

    if (!item) return null;

    return {
        id: item.id.toString(),
        name: item.name,
        imageSrc: "",
        highSlots: 0,
        midSlots: 0,
        lowSlots: 0
    };
}

export const getShipsToBuild = (): { [shipId: string]: number } => {
    const ships: { [shipId: string]: number } = {};

    // Searching Material to Buy
    ALLIANCE_STATIONS.forEach((station) => {
        if (station.needExplorationShips) {
            EXPORATION_STUFF_PER_BASE.forEach((stuff) => {
                if (stuff.fitId) {
                    const fitQuantityRequired = stuff.quantity;
                    const fitQuantityInStationInventory = searchFitQuantityInStationInventory(station, stuff.fitId);

                    if (fitQuantityInStationInventory < fitQuantityRequired) {
                        const ship = getShipForFit(stuff.fitId);

                        if (!ship) return;

                        if (ships[ship.id]) {
                            ships[ship.id]++;
                        } else {
                            ships[ship.id] = 1;
                        }
                    }
                }
            })
        }
    })

    return ships;
}

export const getStuffToBuy = async (multiplier: number): Promise<{ [materialId: string]: STUFF_TO_BUY }> => {
    let materialToBuy: { [materialId: string]: STUFF_TO_BUY } = {

    };

    let materialOwned: { [materialId: string]: STUFF_TO_BUY } = {

    };

    // Searching Material to Buy
    for (let i = 0; i < ALLIANCE_STATIONS.length; i++) {
        const station = ALLIANCE_STATIONS[i];
        if (station.needExplorationShips) {
            for (let y = 0; y < EXPORATION_STUFF_PER_BASE.length; y++) {
                const stuff = EXPORATION_STUFF_PER_BASE[y];
                if (stuff.fitId) {
                    const fitQuantityRequired = stuff.quantity;
                    const fitQuantityInStationInventory = searchFitQuantityInStationInventory(station, stuff.fitId);

                    if (fitQuantityInStationInventory < fitQuantityRequired * multiplier) {
                        const fitMaterials = await getFitMaterialRequired(stuff.fitId);

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
            }
        }
    }

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

            if (materialToBuy[materialId].quantity < 0) {
                delete materialToBuy[materialId];
            }
        }
    }

    return materialToBuy;
}

const searchFitQuantityInStationInventory = (station: STATION, fitId: string) => {
    const inventoryItem = station.inventory.find(inventoryItem => inventoryItem.fitId === fitId);

    return inventoryItem ? inventoryItem.quantity : 0;
}