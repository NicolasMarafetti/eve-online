import { LowSlot } from '@/types/LowSlot'
import Image from 'next/image'
import React from 'react'

interface Props {
    lowSlot: LowSlot,
    index: number,
}

export default function FitLowSlot({ lowSlot, index }: Props) {

    if (lowSlot.status === "loading") {
        return (
            <div className={`flex items-center justify-center slot low-slot low-slot-${index + 1}`} key={index}>
                <div className="flex items-center justify-center slot-item">
                    <Image className="max-h-[80%] max-w-[80%]" height="1000" width="1000" alt="fit" src="/images/fit/loading.webp" data-tooltip="true" title={lowSlot.name} />
                </div>
            </div>
        )
    }

    return (
        <div className={`flex items-center justify-center slot low-slot low-slot-${index + 1}`} key={index}>
            <a className="slot-item" data-dropdown={`dropdown-lowslot-${index + 1}`}>
                <Image height="1000" width="1000" alt="fit" src={lowSlot.imageSrc} data-tooltip="true" title={lowSlot.name} />
            </a>
        </div>
    )
}
