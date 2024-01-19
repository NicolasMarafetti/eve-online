import Image from 'next/image'
import React from 'react'

type Filter = {
    name: string;
    enabled: boolean;
    image: string;
};

type Filters = {
    [key: string]: Filter;
};

export default function HomeFittingFilters() {

    const [filters, setFilters] = React.useState<Filters>({
        armorTanking: {
            name: 'Armor Tanking',
            enabled: false,
            image: '/armor.png'
        },
        shieldTanking: {
            name: 'Armor Tanking',
            enabled: false,
            image: '/armor.png'
        },
        speed: {
            name: 'Armor Tanking',
            enabled: false,
            image: '/armor.png'
        },
    });

    return (
        <div className="bg-black/90 h-full py-5 w-[20vw]">
            <h2 className="mb-10 text-gray-500 text-center">Filters</h2>
            <div className="flex flex-col m-auto w-40">
                <label className="text-gray-500" htmlFor="ship_name">Ship</label>
                <input type="text" name="ship_name" id="ship_name" />
            </div>
            <div>
                {
                    Object.keys(filters).map((key, index) => {
                        const filter = filters[key];
                        return (
                            <div key={index} className="flex items-center">
                                <Image alt={filter.name} src={filter.image} width={64} height={64} />
                                <div className="flex flex-1 justify-between">
                                    <p>{filter.name}</p>
                                    <div className="bg-white w-4 h-4 rounded-full"></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
