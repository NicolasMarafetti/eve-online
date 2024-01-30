/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import React from 'react'

import "./Fit.scss";
import FitHighSlot from './HomeFitting/FitHighSlot';
import FitLowSlot from './HomeFitting/FitLowSlot';
import FitMidSlot from './HomeFitting/FitMidSlot';
import FitRigSlot from './HomeFitting/FitRigSlot';
import { RigSlot } from '@/types/RigSlot';
import { Ship } from '@/types/Ship';
import { ShipFitting } from '@/types/ShipFitting';

interface Props {
    fit: ShipFitting;
    ship: Ship;
}

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

export default function Fit({ fit, ship }: Props) {
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
                {fit.highSlots.map((highSlot, index) => <FitHighSlot highSlot={highSlot} key={index} index={index} />)}
            </div>

            <div className="mid-slots">
                {fit.midSlots.map((midSlot, index) => (<FitMidSlot key={index} index={index} midSlot={midSlot} />))}
            </div>

            <div className="low-slots">
                {fit.lowSlots.map((lowSlot, index) => <FitLowSlot key={index} index={index} lowSlot={lowSlot} />)}
            </div>

            <div className="rig-slots">
                {fit.rigs.map((rig, index) => (<FitRigSlot key={index} index={index} rig={rig} />))}
            </div>

            <div className="sub-system-slots">
            </div>
        </div>
    )
}
