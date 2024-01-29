/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash';

import "./Fit.scss";
import FitHighSlot from './HomeFitting/FitHighSlot';
import { HighSlot } from '@/types/HighSlot';
import FitLowSlot from './HomeFitting/FitLowSlot';
import { LowSlot } from '@/types/LowSlot';
import { MidSlot } from '@/types/MidSlot';
import FitMidSlot from './HomeFitting/FitMidSlot';
import FitRigSlot from './HomeFitting/FitRigSlot';
import { RigSlot } from '@/types/RigSlot';

interface Props {
    simulationInProgress: boolean;
}

const defaultHighSlots: HighSlot[] = [
    {
        name: "Rapid Light Missile Launcher II",
        imageSrc: "https://images.evetech.net/types/1877/icon?size=32",
        status: "online"
    },
    {
        name: "Rapid Light Missile Launcher II",
        imageSrc: "https://images.evetech.net/types/1877/icon?size=32",
        status: "online"
    },
    {
        name: "Rapid Light Missile Launcher II",
        imageSrc: "https://images.evetech.net/types/1877/icon?size=32",
        status: "online"
    },
    {
        name: "Drone Link Augmentor II",
        imageSrc: "https://images.evetech.net/types/24427/icon?size=32",
        status: "online"
    },
    {
        name: "'Arbalest' Heavy Missile Launcher",
        imageSrc: "https://images.evetech.net/types/8105/icon?size=32",
        status: "online"
    },
];

const defaultMidSlots: MidSlot[] = [
    {
        name: "Multispectrum Shield Hardener II",
        imageSrc: "https://images.evetech.net/types/2281/icon?size=32",
        status: "online"
    },
    {
        name: "Caldari Navy Large Shield Extender",
        imageSrc: "https://images.evetech.net/types/31930/icon?size=32",
        status: "online"
    },
    {
        name: "Caldari Navy Large Shield Extender",
        imageSrc: "https://images.evetech.net/types/31930/icon?size=32",
        status: "online"
    },
    {
        name: "Caldari Navy Large Shield Extender",
        imageSrc: "https://images.evetech.net/types/31930/icon?size=32",
        status: "online"
    },
    {
        name: "Caldari Navy Large Shield Extender",
        imageSrc: "https://images.evetech.net/types/31930/icon?size=32",
        status: "online"
    },
    {
        name: "10MN Afterburner II",
        imageSrc: "https://images.evetech.net/types/12058/icon?size=32",
        status: "online"
    },
];

const defaultLowSlots: LowSlot[] = [
    {
        name: "Drone Damage Amplifier II",
        imageSrc: "https://images.evetech.net/types/4405/icon?size=32",
        status: "online"
    },
    {
        name: "Drone Damage Amplifier II",
        imageSrc: "https://images.evetech.net/types/4405/icon?size=32",
        status: "online"
    },
    {
        name: "Drone Damage Amplifier II",
        imageSrc: "https://images.evetech.net/types/4405/icon?size=32",
        status: "online"
    },
];

const defaultRigSlots: RigSlot[] = [
    {
        name: "Medium Core Defense Field Extender II",
        imageSrc: "https://images.evetech.net/types/31796/icon?size=32",
        status: "online"
    },
    {
        name: "Medium Core Defense Field Extender II",
        imageSrc: "https://images.evetech.net/types/31796/icon?size=32",
        status: "online"
    },
    {
        name: "Medium Core Defense Field Extender II",
        imageSrc: "https://images.evetech.net/types/31796/icon?size=32",
        status: "online"
    },
];

export default function Fit({ simulationInProgress }: Props) {

    const [ship, setShip] = useState({
        name: "Gila",
        imageSrc: "https://images.evetech.net/types/17715/render?size=512",
        highSlots: 5,
        midSlots: 6,
        lowSlots: 3,
    });

    const [highSlots, setHighSlots] = useState<HighSlot[]>(cloneDeep(defaultHighSlots));

    const [midSlots, setMidSlots] = useState<MidSlot[]>(cloneDeep(defaultMidSlots));

    const [lowSlots, setLowSlots] = useState<LowSlot[]>(cloneDeep(defaultLowSlots));

    const [rigs, setRigs] = useState<RigSlot[]>(cloneDeep(defaultRigSlots));

    useEffect(() => {
        if (simulationInProgress) {
            setHighSlots(Array(ship.highSlots).fill({ status: 'loading' }));
            setMidSlots(Array(ship.midSlots).fill({ status: 'loading' }));
            setLowSlots(Array(ship.lowSlots).fill({ status: 'loading' }));
            setRigs(Array(3).fill({ status: 'loading' }));
        } else {
            setHighSlots(cloneDeep(defaultHighSlots));
            setMidSlots(cloneDeep(defaultMidSlots));
            setLowSlots(cloneDeep(defaultLowSlots));
            setRigs(cloneDeep(defaultRigSlots));
        }
    }, [simulationInProgress])

    return (
        <div className="fit-base">
            <div className="fit-mask">
                <Image height="1000" width="1000" alt="fit" src="/images/fit/fittingbase.png" />
            </div>
            <div className="fit-ship-image" data-dropdown="dropdown-ship">
                <Image height="1000" width="1000" alt="fit" src={ship.imageSrc} className="rounded-circle" title={ship.name} />
            </div>
            <div className="fit-drop-charge" id="fit-drop-charge">
            </div>
            <div className="high-slots">
                {highSlots.map((highSlot, index) => <FitHighSlot highSlot={highSlot} key={index} index={index} />)}
            </div>

            <div className="mid-slots">
                {midSlots.map((midSlot, index) => (<FitMidSlot key={index} index={index} midSlot={midSlot} />))}
            </div>

            <div className="low-slots">
                {lowSlots.map((lowSlot, index) => <FitLowSlot key={index} index={index} lowSlot={lowSlot} />)}
            </div>

            <div className="rig-slots">
                {rigs.map((rig, index) => (<FitRigSlot key={index} index={index} rig={rig} />))}
            </div>

            <div className="sub-system-slots">
            </div>
        </div>
    )
}
