import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const fits = await prisma.fitItem.findMany();
        return res.status(200).json(fits);
    }

    if (req.method === "POST") {
        const { fitId, itemId, quantity } = req.body;

        if (!fitId || !itemId || !quantity) return res.status(400).json({ error: "Param missing" });

        const fit = await prisma.fitItem.create({
            data: {
                fitId: fitId,
                itemId: itemId,
                quantity
            }
        });

        return res.status(201).json(fit);
    }

    return res.status(405).json({ error: "Method not allowed" });
}