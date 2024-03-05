import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const regions = await prisma.region.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    res.status(200).json(regions);
}