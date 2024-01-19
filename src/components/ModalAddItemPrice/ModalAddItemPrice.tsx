import React from 'react';

import "./style.css"
import { Item } from '@/types/Item';
import { Station } from '@/types/Station';
import { analyseItemPriceHistory } from '@/utils/item-price';

export default class ModalAddItemPrice extends React.Component<
    {
        getHomeData: any,
        itemToAddPrice: Item,
        station: Station
    },
    {
        error: string,
        sellHistory: string,
        price: number,
        sellPerDay: number
    }
>{
    constructor(props: any) {
        super(props);

        this.state = {
            error: "",
            sellHistory: "",
            price: 0,
            sellPerDay: 0
        }
    }

    copyItemName = (e: any) => {
        const { itemToAddPrice } = this.props

        navigator.clipboard.writeText(itemToAddPrice.name);
    }

    modifyHistory = (e: any) => {
        try {
            let informations: {
                price: number,
                sellPerDay: number
            } = analyseItemPriceHistory(e.currentTarget.value);

            this.setState({
                price: informations.price,
                sellHistory: e.currentTarget.value,
                sellPerDay: informations.sellPerDay
            }, this.updatePrice)
        } catch (error) {
            this.setState({ error: "Error getting values" })
            console.error(error);
        }
    }

    modifyPrice = (e: any) => {
        this.setState({ price: parseFloat(e.currentTarget.value) })
    }

    modifySellPerDay = (e: any) => {
        let valueFloat: number = parseFloat(e.currentTarget.value);

        if (isNaN(valueFloat)) {
            this.setState({ sellPerDay: e.currentTarget.value })
        } else {
            this.setState({ sellPerDay: valueFloat })
        }
    }

    updatePrice = async (e?: any) => {
        const { getHomeData, itemToAddPrice, station } = this.props
        const { price, sellPerDay } = this.state

        if (e) e.preventDefault();

        await fetch(
            `${process.env.REACT_APP_SERVER_URL}item/${itemToAddPrice.id}/price`,
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

        this.setState({
            price: 0,
            sellHistory: "",
            sellPerDay: 0
        }, getHomeData)
    }

    render() {
        const { itemToAddPrice, station } = this.props
        const { error, price, sellHistory, sellPerDay } = this.state

        return (
            <div className="modal add_item_price" id="add_item_price">
                {error && <p className="error">{error}</p>}

                <p>Ville: {station.name}</p>
                <div className="object_name">
                    <p>Objet: {itemToAddPrice.name} </p>
                    <button onClick={this.copyItemName}>C</button>
                </div>
                <form onSubmit={this.updatePrice}>
                    <div className="label_input">
                        <label>Valeur</label>
                        <input type="number" onChange={this.modifyPrice} step="0.01" value={price} />
                    </div>
                    <div className="label_input">
                        <label>Vente par jour</label>
                        <input type="number" onChange={this.modifySellPerDay} value={sellPerDay} />
                    </div>
                    <div className="label_input">
                        <label>Test - Copy Past History</label>
                        <input type="textarea" onChange={this.modifyHistory} value={sellHistory} />
                    </div>
                    <input type="submit" value="Valider" />
                </form>
            </div>
        )
    }
}