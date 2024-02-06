import { REGION_IDS } from '@/const/region-ids';
import { STATIONS_API_ID } from '@/const/stations-api-id';
import { STUFF_TO_BUY, calculateAmarrBuyCosts, calculateNSBuyCosts, getStuffToBuy } from '@/utils/exploration'
import React, { useEffect, useState } from 'react'

export default function ExplorationCosts() {

    const [stuffToBuy, setStuffToBuy] = useState<{ [materialId: number]: STUFF_TO_BUY }>(getStuffToBuy(1));

    useEffect(() => {
        getTitaniumPrice();

        getTitaniumPriceWithEveTycoon();
    }, [])

    const getTitaniumPrice = async () => {
        const apiResponseRaw = await fetch(`https://esi.evetech.net/latest/markets/10000002/orders/?order_type=sell&region_id=${REGION_IDS.domain}&type_id=34&is_buy_order=false`);

        const sellOrders = await apiResponseRaw.json();

        const amarrOrders = sellOrders.filter((order: any) => order.location_id === STATIONS_API_ID.amarr);

        const lowestSellPrice = sellOrders.reduce((acc: number, order: any) => {
            if (order.price < acc) {
                return order.price;
            }
            return acc;
        }, sellOrders[0].price);

        let locationIds: number[] = [];
        for (let i = 0; i < sellOrders.length; i++) {
            if (!locationIds.includes(sellOrders[i].location_id)) {
                locationIds.push(sellOrders[i].location_id);
            }
        }
    }

    const getTitaniumPriceWithEveTycoon = async () => {
        const apiResponseRaw = await fetch(`/api/proxy`);

        const eveTycoonResponse: {
            itemType: object,
            orders: {
                duration: number,
                isBuyOrder: boolean,
                issued: number,
                locationId: number,
                minVolume: number,
                orderId: number,
                price: number,
                range: string,
                regionId: number,
                systemId: number,
                typeId: number,
                volumeRemain: number,
                volumeTotal: number,
            }[],
            stationNames: { [stationId: number]: string },
            structureNames: object
        } = await apiResponseRaw.json();
    }

    return (
        <div className="bg-gradient-to-b from-white mx-2 to-gray-400 p-4 rounded-xl">
            <h2 className="font-bold uppercase">Coûts</h2>
            <p className="whitespace-nowrap">Achats à Amarr: {calculateAmarrBuyCosts().toLocaleString('fr-FR')} ISK</p>
            <p className="whitespace-nowrap">Achats en NS: {calculateNSBuyCosts().toLocaleString()} ISK</p>
        </div>
    )
}
