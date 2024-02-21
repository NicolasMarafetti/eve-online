import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { blueprintId } = req.query;

    if (req.method === "GET") {
        // Handle GET request
    } else if (req.method === "PATCH") {
        const { duration } = req.body;

        await prisma.blueprint.update({
            where: {
                id: blueprintId as string
            },
            data: {
                duration: parseInt(duration)
            }
        });

        res.status(200).json({ message: "Blueprint updated" });
    } else if (req.method === "DELETE") {
        // Handle DELETE request
    }
}