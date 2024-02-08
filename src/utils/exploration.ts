import { ALLIANCE_STATIONS, STATION } from "@/const/alliance-stations";
import { EXPLORATION_BLUEPRINTS } from "@/const/exploration-blueprints";
import { EXPLORATION_ITEMS, ITEM } from "@/const/exploration-items";
import { EXPLORATIONS_MATERIALS } from "@/const/exploration-materials";
import { EXPORATION_STUFF_PER_BASE } from "@/const/explorationStuffPerBase";
import { FITS } from "@/const/fits";
import { Ship } from "@/types/Ship";

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

export const getStuffForFit = (fitId: number): { [itemId: number]: number } | null => {
    let items: { [itemId: number]: number } = {};
    const fit = FITS.find(fit => fit.id === fitId);

    if (!fit) return null;

    fit.items.forEach((fitItem) => {
        const item = EXPLORATION_ITEMS.find(item => item.id === fitItem.itemId);

        if (item) {
            if (items[item.id]) {
                items[item.id] += fitItem.quantity;
            } else {
                items[item.id] = fitItem.quantity;
            }
        }
    });

    return items;
}

export const getEquipementsToBuild = (): { [stuffId: number]: number } => {
    const equipements: { [stuffId: number]: number } = {};

    // Searching Material to Buy
    ALLIANCE_STATIONS.forEach((station) => {
        if (station.needExplorationShips) {
            EXPORATION_STUFF_PER_BASE.forEach((stuff) => {
                if (stuff.fitId) {
                    const fitQuantityRequired = stuff.quantity;
                    const fitQuantityInStationInventory = searchFitQuantityInStationInventory(station, stuff.fitId);

                    if (fitQuantityInStationInventory < fitQuantityRequired) {
                        const stuffs = getStuffForFit(stuff.fitId);

                        if (!stuffs) return;

                        for (let stuffId in stuffs) {
                            if (equipements[stuffId]) {
                                equipements[stuffId] += stuffs[stuffId] * (fitQuantityRequired - fitQuantityInStationInventory);
                            } else {
                                equipements[stuffId] = stuffs[stuffId] * (fitQuantityRequired - fitQuantityInStationInventory);
                            }
                        }
                    }
                }
            })
        }
    })

    return equipements;
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

export const getShipForFit = (fitId: number): Ship | null => {
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

            if (materialToBuy[materialId].quantity < 0) {
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