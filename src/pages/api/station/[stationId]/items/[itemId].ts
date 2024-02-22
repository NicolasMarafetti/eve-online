import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { stationId, itemId } = req.query;
    if (req.method === 'PUT') {
        const stationItem = await prisma.stationItem.findFirst({
            where: {
                stationId: stationId as string,
                itemId: itemId as string
            }
        });

        if (!stationItem) {
            await prisma.stationItem.create({
                data: {
                    stationId: stationId as string,
                    itemId: itemId as string,
                    quantity: parseInt(req.body.quantity)
                }
            });
            return res.status(201).json({ stationId, itemId });
        }

        await prisma.stationItem.update({
            where: {
                id: stationItem.id
            },
            data: {
                quantity: parseInt(req.body.quantity)
            }
        });
    } else {
        res.status(200).json({ stationId, itemId });
    }
}