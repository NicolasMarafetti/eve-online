import { EveApiTypeResponse } from "@/types/eve_api";
import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const items = await prisma.item.findMany({
            orderBy: {
                name: "asc"
            }
        });
        return res.status(200).json(items);
    }

    if (req.method === "POST") {
        const { eve_api_item_id, name } = req.body;

        // If we don't have the name but only the item id, we should search the name in the api
        let itemName;
        if (!name) {
            const response = await fetch(`https://esi.evetech.net/latest/universe/types/${eve_api_item_id}/?datasource=tranquility&language=en`);
            const item: EveApiTypeResponse = await response.json();
            itemName = item.name;

            // Searching the item by the name
            const itemInDatabase = await prisma.item.findFirst({
                where: {
                    name: itemName
                }
            });

            if (itemInDatabase) {
                if (!itemInDatabase.eve_api_item_id) {
                    await prisma.item.update({
                        where: {
                            id: itemInDatabase.id
                        },
                        data: {
                            eve_api_item_id
                        }
                    });
                    return res.status(200).json(itemInDatabase);
                }
                return res.status(200).json({ status: "success" });
            } else {
                const item = await prisma.item.create({
                    data: {
                        eve_api_item_id,
                        name: itemName
                    }
                });

                return res.status(201).json(item);
            }

        } else {
            itemName = name;
        }

        const item = await prisma.item.create({
            data: {
                eve_api_item_id,
                name: itemName
            }
        });

        return res.status(201).json(item);
    }

    return res.status(405).json({ error: "Method not allowed" });
}