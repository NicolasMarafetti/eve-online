import Image from 'next/image'
import React from 'react'

import "./Fit.scss";

export default function Fit() {
    return (
        <div className="fit-base">
            <div className="fit-mask">
                <Image height="1000" width="1000" alt="fit" src="/images/fit/fittingbase.png" />
            </div>
            <div className="fit-ship-image" data-dropdown="dropdown-ship">
                <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/17715/render?size=512" className="rounded-circle" title="Gila" />
            </div>
            <div className="fit-drop-charge" id="fit-drop-charge">
            </div>
            <div className="high-slots">
                <div className="slot high-slot high-slot-1">
                    <a className="slot-item" data-dropdown="dropdown-highslot-1">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/1877/icon?size=32" data-tooltip="true" title="Rapid Light Missile Launcher II " />
                    </a>
                </div>
                <div className="slot high-slot high-slot-2">
                    <a className="slot-item" data-dropdown="dropdown-highslot-2">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/1877/icon?size=32" data-tooltip="true" title="Rapid Light Missile Launcher II " />
                    </a>
                </div>
                <div className="slot high-slot high-slot-3">
                    <a className="slot-item" data-dropdown="dropdown-highslot-3">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/1877/icon?size=32" data-tooltip="true" title="Rapid Light Missile Launcher II " />
                    </a>
                </div>
                <div className="slot high-slot high-slot-4">
                    <a className="slot-item" data-dropdown="dropdown-highslot-4">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/24427/icon?size=32" data-tooltip="true" title="Drone Link Augmentor II " />
                    </a>
                </div>
                <div className="slot high-slot high-slot-5">
                    <a className="slot-item" data-dropdown="dropdown-highslot-5">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/8105/icon?size=32" data-tooltip="true" title="'Arbalest' Heavy Missile Launcher " />
                    </a>
                </div>
            </div>

            <div className="mid-slots">
                <div className="slot mid-slot mid-slot-1">
                    <a className="slot-item">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/2281/icon?size=32" data-tooltip="true" title="Multispectrum Shield Hardener II" />
                    </a>
                </div>
                <div className="slot mid-slot mid-slot-2">
                    <a className="slot-item">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/31930/icon?size=32" data-tooltip="true" title="Caldari Navy Large Shield Extender" />
                    </a>
                </div>
                <div className="slot mid-slot mid-slot-3">
                    <a className="slot-item">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/31930/icon?size=32" data-tooltip="true" title="Caldari Navy Large Shield Extender" />
                    </a>
                </div>
                <div className="slot mid-slot mid-slot-4">
                    <a className="slot-item">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/31930/icon?size=32" data-tooltip="true" title="Caldari Navy Large Shield Extender" />
                    </a>
                </div>
                <div className="slot mid-slot mid-slot-5">
                    <a className="slot-item">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/31930/icon?size=32" data-tooltip="true" title="Caldari Navy Large Shield Extender" />
                    </a>
                </div>
                <div className="slot mid-slot mid-slot-6">
                    <a className="slot-item">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/12058/icon?size=32" data-tooltip="true" title="10MN Afterburner II" />
                    </a>
                </div>
            </div>

            <div className="low-slots">
                <div className="slot low-slot low-slot-1">
                    <a className="slot-item">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/4405/icon?size=32" data-tooltip="true" title="Drone Damage Amplifier II" />
                    </a>
                </div>
                <div className="slot low-slot low-slot-2">
                    <a className="slot-item">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/4405/icon?size=32" data-tooltip="true" title="Drone Damage Amplifier II" />
                    </a>
                </div>
                <div className="slot low-slot low-slot-3">
                    <a className="slot-item">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/4405/icon?size=32" data-tooltip="true" title="Drone Damage Amplifier II" />
                    </a>
                </div>
            </div>

            <div className="rig-slots">
                <div className="slot rig-slot rig-slot-1">
                    <a className="slot-item" asp-controller="Market" asp-action="Market" asp-route-type="sell" asp-route-itemid="31796" target="_blank">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/31796/icon?size=32" data-tooltip="true" title="Medium Core Defense Field Extender II" />
                    </a>
                </div>
                <div className="slot rig-slot rig-slot-2">
                    <a className="slot-item" asp-controller="Market" asp-action="Market" asp-route-type="sell" asp-route-itemid="31796" target="_blank">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/31796/icon?size=32" data-tooltip="true" title="Medium Core Defense Field Extender II" />
                    </a>
                </div>
                <div className="slot rig-slot rig-slot-3">
                    <a className="slot-item" asp-controller="Market" asp-action="Market" asp-route-type="sell" asp-route-itemid="31796" target="_blank">
                        <Image height="1000" width="1000" alt="fit" src="https://images.evetech.net/types/31796/icon?size=32" data-tooltip="true" title="Medium Core Defense Field Extender II" />
                    </a>
                </div>
            </div>

            <div className="sub-system-slots">
            </div>
        </div>
    )
}
