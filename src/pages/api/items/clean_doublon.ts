import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const items = await prisma.item.findMany({
        include: {
            Blueprint: true,
            Production: true,
            FitItem: true
        }
    });

    // Clean items doublon, trying to keep the ones with the eve api id
    let itemsToDelete = [];
    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            if (items[i].name === items[j].name) {
                // If an item is linked to a blueprint, or production, or a fitItem, we keep it
                if (items[i].Blueprint || items[i].Production || items[i].FitItem) {
                    itemsToDelete.push(items[j].id);
                } else if (items[j].Blueprint || items[j].Production || items[j].FitItem) {
                    itemsToDelete.push(items[i].id);
                } else {
                    // Prioritize the one with the eve api id
                    if (items[i].eve_api_item_id) {
                        itemsToDelete.push(items[j].id);
                    } else {
                        itemsToDelete.push(items[i].id);
                    }
                }
            }
        }
    }

    let promises = itemsToDelete.map(async itemId => {
        try {
            await prisma.item.delete({
                where: {
                    id: itemId
                }
            });
        } catch (error) {
            console.error("id: ", itemId);
            console.error("error: ", error);
            // NP
        }

    });

    await Promise.all(promises);

    return res.status(200).json({});
}