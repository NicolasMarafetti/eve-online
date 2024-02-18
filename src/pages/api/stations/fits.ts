import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const stationFits = await prisma.stationFit.findMany();
    res.status(200).json(stationFits);
}