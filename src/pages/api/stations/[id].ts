import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id;

    if(typeof id !== "string"){
        return res.status(400).json({ error: "Invalid id" });
    }

    if (req.method === "GET") {
        return res.status(200).json({ id });
    }
    if (req.method === "DELETE") {
        await prisma.station.delete({
            where: {
                id: id.toString()
            }
        });
        return res.status(200).json({ id });
    }
    return res.status(405).json({ error: "Method not allowed" });
}