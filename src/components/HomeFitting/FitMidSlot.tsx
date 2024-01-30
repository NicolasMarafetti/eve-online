import { MidSlot } from '@/types/MidSlot'
import Image from 'next/image'
import React from 'react'

interface Props {
    midSlot: MidSlot,
    index: number,
}

export default function FitMidSlot({ midSlot, index }: Props) {

    if (midSlot.status === "offline") {
        return (
            <div className={`flex items-center justify-center slot mid-slot mid-slot-${index + 1}`} key={index}>
                <div className="flex items-center justify-center slot-item"></div>
            </div>
        )
    }


    if (midSlot.status === "loading") {
        return (
            <div className={`flex items-center justify-center slot mid-slot mid-slot-${index + 1}`} key={index}>
                <div className="flex items-center justify-center slot-item">
                    <Image className="max-h-[80%] max-w-[80%]" height="1000" width="1000" alt="fit" src="/images/fit/loading.webp" data-tooltip="true" title={midSlot.name} />
                </div>
            </div>
        )
    }

    return (
        <div className={`flex items-center justify-center slot mid-slot mid-slot-${index + 1}`} key={index}>
            <a className="slot-item" data-dropdown={`dropdown-midslot-${index + 1}`}>
                <Image height="1000" width="1000" alt="fit" src={midSlot.imageSrc} data-tooltip="true" title={midSlot.name} />
                <p className="absolute bottom-1 -left-5 text-center text-sm">80</p>
            </a>
        </div>
    )
}
