import React from 'react';

import "./style.css"
import { Corporation } from '@/types/Corporation';

export default class ModalAddReward extends React.Component<
    {
        closeAddRewardModal: any,
        corporation: null | Corporation
    },
    {
        error: string,
        newReward: {
            name: string,
            quantity: number,
            lpCost: number,
            iskCost: number,
            requiredItems: {
                quantity: number,
                name: string
            }[]
        }
    }
>{
    addNewRewardRequiredObject = (e: any): void => {
        const { newReward } = this.state

        e.preventDefault();

        this.setState({
            newReward: {
                ...newReward,
                requiredItems: [
                    ...newReward.requiredItems,
                    {
                        quantity: 1,
                        name: ""
                    }
                ]
            }
        })
    }

    addReward = async (e: any): Promise<boolean> => {
        const { corporation } = this.props;
        let { newReward } = this.state;

        e.preventDefault();

        try {
            if (corporation) {
                await fetch(
                    `${process.env.REACT_APP_SERVER_URL}reward`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...newReward,
                            corporation: corporation.id
                        })
                    }
                )

                newReward.name = "";

                this.setState({
                    error: "",
                    newReward
                });
            }

            return true;
        } catch (error: any) {
            if (typeof error.response !== "undefined") {
                this.setState({ error: error.response.data.message })
            } else {
                console.error("Error addReward : ", error);
            }

            return false;
        }
    }

    constructor(props: any) {
        super(props);

        this.state = {
            error: "",
            newReward: {
                name: "",
                quantity: 0,
                lpCost: 0,
                iskCost: 0,
                requiredItems: []
            }
        }
    }

    modifyNewRewardIskCost = (e: any): void => {
        const { newReward } = this.state

        this.setState({
            newReward: {
                ...newReward,
                iskCost: parseInt(e.currentTarget.value.replace(/\s+/g, ''))
            }
        })
    }

    modifyNewRewardName = (e: any): void => {
        const { newReward } = this.state

        this.setState({
            newReward: {
                ...newReward,
                name: e.currentTarget.value
            }
        })
    }

    modifyNewRewardQuantity = (e: any): void => {
        const { newReward } = this.state

        this.setState({
            newReward: {
                ...newReward,
                quantity: e.currentTarget.value
            }
        })
    }

    modifyNewRewardRequiredItemQuantity = (key: number, quantity: number) => {
        const { newReward } = this.state

        let requireItems: {
            quantity: number,
            name: string
        }[] = newReward.requiredItems;
        requireItems[key].quantity = quantity;

        this.setState({
            newReward: {
                ...newReward,
                requiredItems: requireItems
            }
        })
    }

    modifyNewRewardRequiredItemName = (key: number, name: string) => {
        const { newReward } = this.state

        let requireItems: {
            quantity: number,
            name: string
        }[] = newReward.requiredItems;
        requireItems[key].name = name;

        this.setState({
            newReward: {
                ...newReward,
                requiredItems: requireItems
            }
        })
    }

    modifyNewRewardLpCost = (e: any): void => {
        const { newReward } = this.state

        this.setState({
            newReward: {
                ...newReward,
                lpCost: e.currentTarget.value
            }
        })
    }

    render() {
        const { closeAddRewardModal } = this.props
        const { error, newReward } = this.state

        return (
            <div className="modal add_reward" id="add_reward">
                <button className="close" onClick={closeAddRewardModal}>X</button>
                {error && <p className="error">{error}</p>}
                <form onSubmit={this.addReward}>
                    <div className="label_input">
                        <label>Nom de l&apos;objet</label>
                        <input onChange={this.modifyNewRewardName} type="text" value={newReward.name} />
                    </div>
                    <div className="label_input">
                        <label>Quantity</label>
                        <input onChange={this.modifyNewRewardQuantity} type="number" value={newReward.quantity} />
                    </div>
                    <div className="label_input">
                        <label>LP Cost</label>
                        <input onChange={this.modifyNewRewardLpCost} type="number" value={newReward.lpCost} />
                    </div>
                    <div className="label_input">
                        <label>ISK Cost</label>
                        <input onChange={this.modifyNewRewardIskCost} type="text" value={newReward.iskCost.toLocaleString()} />
                    </div>
                    <div className="required_items">
                        <p>Required items</p>
                        <ul>
                            {
                                newReward.requiredItems.map((requireItem: {
                                    quantity: number,
                                    name: string
                                }, key: number) => {
                                    return (
                                        <li key={key}>
                                            <input onChange={(e: any) => this.modifyNewRewardRequiredItemQuantity(key, e.currentTarget.value)} type="number" value={requireItem.quantity} />
                                            <span>x</span>
                                            <input onChange={(e: any) => this.modifyNewRewardRequiredItemName(key, e.currentTarget.value)} type="text" value={requireItem.name} />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <button onClick={this.addNewRewardRequiredObject}>Ajouter un objet requis</button>
                    <input type="submit" value="Ajouter l'objet" />
                </form>
            </div>
        )
    }
}
