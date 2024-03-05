import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { region_id } = req.query;

    console.log("region id: ", region_id);
}