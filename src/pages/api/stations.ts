import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const stations = await prisma.station.findMany();
        return res.status(200).json(stations);
    }

    if (req.method === "POST") {
        const { name } = req.body;

        if (!name) return res.status(400).json({ error: "Name is required" });

        const station = await prisma.station.create({
            data: {
                name: name.toString()
            }
        });

        return res.status(201).json(station);
    }

    return res.status(405).json({ error: "Method not allowed" });
}