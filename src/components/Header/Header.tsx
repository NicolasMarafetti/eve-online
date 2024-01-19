import React from 'react';

import "./style.css";
import { Corporation } from '@/types/Corporation';
import { Station } from '@/types/Station';
import { User } from '@/types/User';

export class Header extends React.Component<
    {
        changeStation: any,
        corporationChanged: any,
        getHomeData: any
    },
    {
        corporations: Corporation[],
        stations: Station[],
        user: undefined | User
    }
>{
    constructor(props: any) {
        super(props);

        this.state = {
            corporations: [],
            stations: [],
            user: undefined
        }
    }

    componentDidMount = async () => {
        await this.getCorporations();
        await this.getStations();
        await this.getUser();
    }

    getCorporations = async (): Promise<boolean> => {
        const { corporationChanged, getHomeData } = this.props;

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}corporation`)

        const corporationsResult = await response.json();

        const corporations = corporationsResult.data.corporations;

        this.setState({ corporations });

        corporationChanged(corporations[0]);

        await getHomeData();

        return true;
    }

    getStations = async (): Promise<boolean> => {
        const { changeStation, getHomeData } = this.props;

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}station`)

        const stationsResult = await response.json();

        const stations = stationsResult.data.stations;

        this.setState({ stations })

        changeStation(stations[0]);

        await getHomeData();

        return true;
    }

    getUser = async (): Promise<boolean> => {
        const data = await fetch(`${process.env.REACT_APP_SERVER_URL}user`);

        const dataParsed = await data.json();

        this.setState({
            user: dataParsed.data.user
        })

        return true;
    }

    modifyUserCurrentTrades = async (e: any): Promise<boolean> => {
        const { getHomeData } = this.props;
        const { user } = this.state;

        const currentTrades: number = e.currentTarget.value;

        await fetch(
            `${process.env.REACT_APP_SERVER_URL}user/current_trades`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentTrades
                })
            }
        )

        await getHomeData();

        if (user) {
            this.setState({
                user: {
                    ...user,
                    currentTrades
                }
            })
        }

        return true;
    }

    modifyUserIsk = async (e: any): Promise<boolean> => {
        const { getHomeData } = this.props;
        const { user } = this.state;

        const isk: number = parseInt(e.currentTarget.value.replace(/\s+/g, ''));

        await fetch(
            `${process.env.REACT_APP_SERVER_URL}user/isk`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isk
                })
            }
        )

        await getHomeData();

        if (user) {
            this.setState({
                user: {
                    ...user,
                    isk
                }
            })
        }

        return true;
    }

    modifyUserLp = async (e: any): Promise<boolean> => {
        const { getHomeData } = this.props;
        const { user } = this.state;

        const lp: number = e.currentTarget.value;

        await fetch(
            `${process.env.REACT_APP_SERVER_URL}user/lp`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lp
                })
            }
        )

        await getHomeData();

        if (user) {
            this.setState({
                user: {
                    ...user,
                    lp
                }
            })
        }

        return true;
    }

    modifyUserMaxTrades = async (e: any): Promise<boolean> => {
        const { getHomeData } = this.props;
        const { user } = this.state;

        const maxTrades: number = e.currentTarget.value;

        await fetch(
            `${process.env.REACT_APP_SERVER_URL}user/max_trades`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    maxTrades
                })
            }
        )

        await getHomeData();

        if (user) {
            this.setState({
                user: {
                    ...user,
                    maxTrades
                }
            })
        }

        return true;
    }

    render() {
        const { corporations, stations, user } = this.state

        return (
            <header className="App-header">
                <div className="left">
                    <div className="label_input">
                        <label>Corporation</label>
                        <select className="corporations">
                            {
                                corporations.map((corporationTmp: Corporation) => {
                                    return (
                                        <option key={corporationTmp.id} value={corporationTmp.id}>{corporationTmp.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="label_input">
                        <label>Station</label>
                        <select className="stations">
                            {
                                stations.map((stationTmp: Station) => {
                                    return (
                                        <option key={stationTmp.id} value={stationTmp.id}>{stationTmp.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="center">
                    <div className="label_input">
                        <label>LP</label>
                        <input onChange={this.modifyUserLp} type="number" value={user ? user.lp : 0} />
                    </div>
                    <div className="label_input">
                        <label>ISK</label>
                        <input onChange={this.modifyUserIsk} type="string" value={user ? user.isk.toLocaleString() : 0} />
                    </div>
                </div>
                <div className="right">
                    <div className="label_input">
                        <label>Max possible trades</label>
                        <input onChange={this.modifyUserMaxTrades} type="number" value={user ? user.maxTrades : 0} />
                    </div>
                    <div className="label_input">
                        <label>Quantité de trades actuel</label>
                        <input onChange={this.modifyUserCurrentTrades} type="string" value={user ? user.currentTrades : 0} />
                    </div>
                </div>
            </header>
        )
    }
}
