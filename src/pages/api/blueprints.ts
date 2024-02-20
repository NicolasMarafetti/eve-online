import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const blueprints = await prisma.blueprint.findMany();
        return res.status(200).json(blueprints);
    }

    if (req.method === "POST") {
        const { quantity, itemCreatedId } = req.body;

        const blueprint = await prisma.blueprint.create({
            data: { quantity, itemCreatedId }
        });

        return res.status(201).json(blueprint);
    }

    return res.status(405).json({ error: "Method not allowed" });
}