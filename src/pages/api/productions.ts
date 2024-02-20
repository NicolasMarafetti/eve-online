import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const productions = await prisma.production.findMany();
        return res.status(200).json(productions);
    }

    if (req.method === "PUT") {
        const { characterId, itemId, stationId } = req.body;

        if (typeof itemId !== "string") return res.status(400).json({ message: "itemId must be a string" });

        const production = await prisma.production.findFirst({
            where: {
                itemId
            }
        });

        const characterIdToUse = (typeof characterId === "string" && characterId !== "") ? characterId : null;
        const stationIdToUse = (typeof stationId === "string" && stationId !== "") ? stationId : null;

        if (!production) {
            await prisma.production.create({
                data: {
                    itemId,
                    characterId,
                    stationId
                }
            });
        } else {
            if (characterIdToUse) {
                await prisma.production.update({
                    where: {
                        id: production.id
                    },
                    data: {
                        characterId: characterIdToUse
                    }
                });
                return res.status(200).json({ message: "Character updated" });
            }
            if (stationIdToUse) {
                await prisma.production.update({
                    where: {
                        id: production.id
                    },
                    data: {
                        stationId: stationIdToUse
                    }
                });
                return res.status(200).json({ message: "Station updated" });
            }
        }

        return res.status(200).json({ message: "Character updated" });
    }

    return res.status(405).json({ error: "Method not allowed" });
}
