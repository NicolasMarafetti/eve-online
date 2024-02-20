import { Blueprint, BlueprintMaterial, FitItem, Production, StationFit } from "@prisma/client";
import { getEquipementsToBuild } from "./exploration";

const getObjectsToProduceInStation = (fitItems: FitItem[], productions: Production[], stationId: string, stationFits: StationFit[]): { [itemId: string]: number } => {
    const equipmentsToBuild = getEquipementsToBuild(fitItems, stationFits);

    let objectsToProduceInStation: { [itemId: string]: number } = {};

    const stationProductions = productions.filter(production => production.stationId === stationId);

    stationProductions.forEach(production => {
        const equipmentQuantity = equipmentsToBuild[production.itemId] || 0;

        if (objectsToProduceInStation[production.itemId]) {
            objectsToProduceInStation[production.itemId] += equipmentQuantity;
        } else {
            objectsToProduceInStation[production.itemId] = equipmentQuantity;
        }
    });
    return objectsToProduceInStation;
}

export const getStations = async () => {
    const response = await fetch('/api/stations');
    return await response.json();
}

export const getStationRessourcesNeeded = (bluePrints: Blueprint[], blueprintMaterials: BlueprintMaterial[], fitItems: FitItem[], productions: Production[], stationId: string, stationFits: StationFit[]): { [itemId: string]: number } => {
    let ressourcesNeeded: { [itemId: string]: number } = {};

    const objectsToProduceInStation = getObjectsToProduceInStation(fitItems, productions, stationId, stationFits);

    Object.keys(objectsToProduceInStation).forEach(itemId => {
        const quantity = objectsToProduceInStation[itemId];

        const bluePrint = bluePrints.find(bluePrint => bluePrint.itemCreatedId === itemId);
        if(!bluePrint) return;

        const materials = blueprintMaterials.filter(material => material.blueprintId === bluePrint.id);

        materials.forEach(material => {
            if (ressourcesNeeded[material.itemId]) {
                ressourcesNeeded[material.itemId] += material.quantity * quantity;
            } else {
                ressourcesNeeded[material.itemId] = material.quantity * quantity;
            }
        });

    });

    return ressourcesNeeded;
}