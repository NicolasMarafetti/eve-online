import { EXPORATION_STUFF_PER_BASE } from '@/const/explorationStuffPerBase'
import { FITS } from '@/const/fits';
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

export default function ExplorationRessourcesGraph() {

    const [data, setData] = useState<{
        name: string,
        uv: number
    }[]>([]);

    useEffect(() => {
        const dataTmp: {
            name: string,
            uv: number
        }[] = EXPORATION_STUFF_PER_BASE.map((stuff) => {
            const fitName = FITS.find(fit => fit.id === stuff.fitId)?.name || 'Unknown';
            return {
                name: fitName,
                uv: stuff.quantity
            }
        })

        setData(dataTmp);
    }, []);

    return (
        <div className="">
            <h2 className="font-bold uppercase">Suivi des ressources</h2>
            {
                data.length &&
                <LineChart
                    className="text-xs"
                    width={400}
                    height={200}
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </LineChart>
            }
        </div>
    )
}
