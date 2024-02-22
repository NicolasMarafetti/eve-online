import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const stationItems = await prisma.stationItem.findMany();
    res.status(200).json(stationItems);
}