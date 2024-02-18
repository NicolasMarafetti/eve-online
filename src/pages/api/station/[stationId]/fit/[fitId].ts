import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { stationId, fitId } = req.query;

    if (req.method === 'GET') {
        const stationFit = await prisma.stationFit.findFirst({
            where: {
                fitId: fitId as string,
                stationId: stationId as string
            }
        });

        if (!stationFit) {
            return res.status(404).json({ message: 'Not found' });
        }

        return res.status(200).json(stationFit);
    } else if (req.method === 'PUT') {
        const { stationId, fitId } = req.query;
        const { quantity } = req.body;

        const stationFit = await prisma.stationFit.findFirst({
            where: {
                fitId: fitId as string,
                stationId: stationId as string
            }
        });

        if (stationFit) {
            await prisma.stationFit.update({
                where: {
                    id: stationFit.id
                },
                data: {
                    quantity: parseInt(quantity as string)
                }
            });
        } else {
            await prisma.stationFit.create({
                data: {
                    quantity: parseInt(quantity as string),
                    fitId: fitId as string,
                    stationId: stationId as string
                }
            });
        }

        return res.status(200).json({ message: 'Updated' });
    } else if (req.method === 'DELETE') {
        // Handle DELETE request
    }

    return res.status(405).json({ message: 'Method not allowed' });
}