'use client'

import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

export default function ExplorationInventory() {

    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [data02, setData02] = useState<any[]>([
        {
            category: "Materials",
            name: 'Charred Micro Circuit',
            value: 0
        },
        {
            category: "Materials",
            name: 'Conductive Polymer',
            value: 0
        },
        {
            category: "Materials",
            name: 'Damage Artificial Neural Network',
            value: 0
        },
        {
            category: "Materials",
            name: 'Fried Interface Circuit',
            value: 3
        },
        {
            category: "Materials",
            name: 'Isogen',
            value: 0
        },
        {
            category: "Materials",
            name: 'Megacyte',
            value: 0
        },
        {
            category: "Materials",
            name: 'Mexallon',
            value: 0
        },
        {
            category: "Materials",
            name: 'Morphite',
            value: 0
        },
        {
            category: "Materials",
            name: 'Nocxium',
            value: 0
        },
        {
            category: "Materials",
            name: 'Pyerite',
            value: 0
        },
        {
            category: "Materials",
            name: 'Tripped Power Circuit',
            value: 0
        },
        {
            category: "Materials",
            name: 'Tritanium',
            value: 0
        },
        {
            category: "Fit",
            name: 'Magnate - Scanner',
            value: 3
        },
        {
            category: "Fit",
            name: 'Magnate - Data',
            value: 2
        },
        {
            category: "Fit",
            name: 'Magnate - Relic',
            value: 3
        },
        {
            category: "Stuff",
            name: '5MN Microwarpdrive I',
            value: 0
        },
        {
            category: "Stuff",
            name: 'Cargo Scanner I',
            value: 0
        },

        {
            category: "Stuff",
            name: 'Core Probe Launcher',
            value: 0
        },
        {
            category: "Stuff",
            name: 'Core Scanner Probe I',
            value: 0
        },
        {
            category: "Stuff",
            name: 'Data Analyzer I',
            value: 0
        },
    ]);

    useEffect(() => {
        const categoryData = data02.reduce((acc: any, item) => {
            if (acc[item.category]) {
                acc[item.category] += item.value;
            } else {
                acc[item.category] = item.value;
            }
            return acc;
        }, {});
        const categoryDataArray = Object.keys(categoryData).map((key) => {
            return {
                name: key,
                value: categoryData[key]
            }
        });
        setCategoryData(categoryDataArray);
    }, [data02]);

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        const itemsTotalQuantity = categoryData.reduce((acc, item) => {
            return acc + item.value;
        }, 0);

        if (categoryData[index].value < (itemsTotalQuantity / 100)) {
            return null;
        }

        return (
            <text
                x={x}
                y={y}
                fill="whitex<"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {categoryData[index].name}
            </text>
        );
    };

    const renderRessourceLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }: any) => {
        const itemsTotalQuantity = data02.reduce((acc, item) => {
            return acc + item.value;
        }, 0);

        if (data02[index].value < (itemsTotalQuantity / 100)) {
            return "";
        }

        return data02[index].name;
    }

    return (
        <div className="bg-gradient-to-b from-white mx-2 rounded-xl to-gray-400 p-4">
            <h2 className="font-bold uppercase">Inventaire</h2>
            <PieChart className="text-xs" width={600} height={400}>
                <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" label={renderCustomizedLabel} labelLine={false} outerRadius={60}>
                    {
                        categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={80} fill="black" label={renderRessourceLabel} />
            </PieChart>
        </div>
    )
}
