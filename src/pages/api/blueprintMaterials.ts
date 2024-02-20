import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const blueprints = await prisma.blueprintMaterial.findMany();
        return res.status(200).json(blueprints);
    }

    if (req.method === "POST") {
        const { blueprintId, itemId, quantity } = req.body;

        if (!blueprintId || !itemId || !quantity) return res.status(400).json({ error: "Param missing" });

        const blueprint = await prisma.blueprintMaterial.create({
            data: {
                blueprintId: blueprintId,
                itemId: itemId,
                quantity
            }
        });

        return res.status(201).json(blueprint);
    }

    return res.status(405).json({ error: "Method not allowed" });
}