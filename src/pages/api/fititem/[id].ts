import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const fitItems = await prisma.fitItem.findMany({
        select: {
            id: true,
            quantity: true,
            fit: true,
            item: true
        },
        where: {
            fitId: id as string
        }
    });
    return res.status(200).json(fitItems);
}
