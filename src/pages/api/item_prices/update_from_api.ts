import { getItemPricesFromApi } from "@/utils/eve-api";
import { refreshAllRegionItemsPrices } from "@/utils/item-price";
import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { item_id, region_id } = req.query;

        if (!item_id) {
            refreshAllRegionItemsPrices(region_id as string, res);
        } else {
            const item = await prisma.item.findFirst({
                where: {
                    id: item_id as string
                }
            });
            if (!item || !item.eve_api_item_id) {
                return res.status(404).json({ message: "Item not found" });
            }

            await getItemPricesFromApi(item.eve_api_item_id, region_id as string);
            return res.status(200).json({ message: "ok" });
        }

        return res.status(200).json({ message: "ok" });
    } else if (req.method === "POST") {
        const { item_name, region_id } = req.query;

        // Searching if the item already exists in the database
        const item = await prisma.item.findFirst({
            where: {
                name: item_name as string
            }
        });

        if (item) {
            // @TODO:: Es-ce possible de trouver l'object id depuis le nom ?
            return res.status(200).json({ message: "ok" });
        } else {
            return res.status(404).json({ message: "Item not found" });
        }

    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}