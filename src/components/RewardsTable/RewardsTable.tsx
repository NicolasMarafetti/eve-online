import React from 'react';

import "./style.css";
import { RewardItem, RewardTableItem } from '@/types/RewardTableItem';
import { Station } from '@/types/Station';
import { analyseItemPriceHistory } from '@/utils/item-price';
import { updateItemPrice } from '@/utils/item';

interface Props {
    getHomeData: any,
    rewards: RewardItem[],
    station: null | Station
}

const RewardsTable = ({ getHomeData, rewards, station }: Props) => {
    const itemHistoryPasted = async (itemId: number, inputValue: string) => {
        if (station) {
            let informations: {
                price: number,
                sellPerDay: number
            } = analyseItemPriceHistory(inputValue);

            await updateItemPrice(itemId, station.id, informations.price, informations.sellPerDay);

            await getHomeData();
        }
    }

    const modifyItemPrice = async (itemId: number, price: number) => {
        if (station) {
            await fetch(
                `${process.env.REACT_APP_SERVER_URL}item/${itemId}/price`,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        price,
                        station: station.id
                    })
                }
            )

            getHomeData();
        } else {
            console.error("RewardsTable - modifyItemPrice - Station not found");
        }
    }

    const modifyItemOwnedQuantity = async (itemId: number, quantity: number) => {
        await fetch(
            `${process.env.REACT_APP_SERVER_URL}item/${itemId}/owned_quantity`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ownedQuantity: quantity
                })
            }
        )

        getHomeData();
    }

    return (
        <table className="reward" id="reward_table">
            <thead>
                <tr>
                    <th>Récompense</th>
                    <th>LP Cost</th>
                    <th>ISK Cost (isk cost + required items + sell tax)</th>
                    <th>Item Price</th>
                    <th>ISK / LP</th>
                    <th>Quantité possédé</th>
                    <th>Quantité à acheter</th>
                    <th>Mon prix de vente</th>
                    <th>Objets requis</th>
                </tr>
            </thead>
            <tbody>
                {rewards.map((reward) => {
                    return (
                        <tr key={reward.itemId}>
                            <td>
                                <span>{reward.quantity} x {reward.name}</span>
                                <button onClick={() => {
                                    navigator.clipboard.writeText(reward.name)
                                }}>C</button>
                            </td>
                            <td>{reward.lpCost.toLocaleString()}</td>
                            <td>{reward.iskCost.toLocaleString()}</td>
                            <td className="item_price">
                                <div className="item_price_content">
                                    <input onChange={
                                        (e: any) => {
                                            modifyItemPrice(reward.itemId, parseInt(e.currentTarget.value.replace(/\s+/g, '')))
                                        }
                                    } type="text" value={reward.itemPrice.toLocaleString()} />
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(reward.itemPrice.toString())
                                    }}>C</button>
                                </div>
                                <div className="label_input paste_history">
                                    <label>Paste History</label>
                                    <input onChange={(e: any) => {
                                        itemHistoryPasted(reward.itemId, e.currentTarget.value)
                                    }} type="text"></input>
                                </div>
                            </td>
                            <td>{reward.iskPerLp.toFixed(2)}</td>
                            <td>
                                <input
                                    onChange={
                                        (e: any) => {
                                            modifyItemOwnedQuantity(reward.itemId, e.currentTarget.value)
                                        }
                                    }
                                    type="number"
                                    value={reward.ownedQuantity}
                                />
                            </td>
                            <td>{reward.quantityToBuy}</td>
                            <td>
                                {reward.mySellPrice.toLocaleString()}
                                <button onClick={() => {
                                    navigator.clipboard.writeText(reward.mySellPrice.toString())
                                }}>C</button>
                            </td>
                            <td>
                                {reward.requiredItems.map((requiredItem: {
                                    id: number,
                                    quantity: number,
                                    name: string,
                                    price: number
                                }) => {
                                    return <div className="required_object" key={requiredItem.name}>
                                        <p>
                                            {requiredItem.quantity} x {requiredItem.name}
                                            <button onClick={() => {
                                                navigator.clipboard.writeText(requiredItem.name)
                                            }}>C</button>
                                        </p>
                                        <p><input type="number" step="0.01" value={requiredItem.price} onChange={(e: any) => {
                                            modifyItemPrice(requiredItem.id, e.currentTarget.value)
                                        }} /> ISK</p>
                                    </div>
                                })}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table >
    )
}

RewardsTable.displayName = 'RewardsTable';

export default RewardsTable;
