import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const itemPrices = await prisma.itemPrice.findMany();

    res.status(200).json(itemPrices);
}