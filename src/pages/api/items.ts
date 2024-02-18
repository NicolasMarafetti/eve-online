import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const items = await prisma.item.findMany();
        return res.status(200).json(items);
    }

    if (req.method === "POST") {
        const { name } = req.body;

        if (!name) return res.status(400).json({ error: "Name is required" });

        const item = await prisma.item.create({
            data: {
                name: name.toString()
            }
        });

        return res.status(201).json(item);
    }

    return res.status(405).json({ error: "Method not allowed" });
}