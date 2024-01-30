import { HighSlot } from '@/types/HighSlot'
import Image from 'next/image'
import React from 'react'

interface Props {
    highSlot: HighSlot,
    index: number,
}

export default function FitHighSlot({ highSlot, index }: Props) {

    if (highSlot.status === "offline") {
        return (
            <div className={`flex items-center justify-center slot high-slot high-slot-${index + 1}`} key={index}>
                <div className="flex items-center justify-center slot-item">
                </div>
            </div>
        )
    }

    if (highSlot.status === "loading") {
        return (
            <div className={`flex items-center justify-center slot high-slot high-slot-${index + 1}`} key={index}>
                <div className="flex items-center justify-center slot-item">
                    <Image className="max-h-[80%] max-w-[80%]" height="1000" width="1000" alt="fit" src="/images/fit/loading.webp" data-tooltip="true" title={highSlot.name} />
                </div>
            </div>
        )
    }

    return (
        <div className={`flex items-center justify-center slot high-slot high-slot-${index + 1}`} key={index}>
            <a className="slot-item" data-dropdown={`dropdown-highslot-${index + 1}`}>
                <Image height="1000" width="1000" alt="fit" src={highSlot.imageSrc} data-tooltip="true" title={highSlot.name} />
            </a>
            <p className="absolute -bottom-3 text-center text-sm">96</p>
        </div>
    )
}
