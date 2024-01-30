import { RigSlot } from '@/types/RigSlot'
import Image from 'next/image'
import React from 'react'

interface Props {
    rig: RigSlot,
    index: number,
}

export default function FitRigSlot({ rig, index }: Props) {

    if (rig.status === "offline") {
        return (
            <div className={`flex items-center justify-center slot rig-slot rig-slot-${index + 1}`} key={index}>
                <div className="flex items-center justify-center slot-item"></div>
            </div>
        )
    }

    if (rig.status === "loading") {
        return (
            <div className={`flex items-center justify-center slot rig-slot rig-slot-${index + 1}`} key={index}>
                <div className="flex items-center justify-center slot-item">
                    <Image className="max-h-[80%] max-w-[80%]" height="1000" width="1000" alt="fit" src="/images/fit/loading.webp" data-tooltip="true" title={rig.name} />
                </div>
            </div>
        )
    }

    return (
        <div className={`flex items-center justify-center slot rig-slot rig-slot-${index + 1}`} key={index}>
            <a className="slot-item" data-dropdown={`dropdown-rigslot-${index + 1}`}>
                <Image height="1000" width="1000" alt="fit" src={rig.imageSrc} data-tooltip="true" title={rig.name} />
                <p className="absolute -bottom-1 -right-5 text-center text-sm">70</p>
            </a>
        </div>
    )
}
