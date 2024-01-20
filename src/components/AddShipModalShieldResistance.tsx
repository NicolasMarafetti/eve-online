import { resistanceColors, resistanceIcons } from '@/const/resistance_colors';
import { calculateGenericLeftPosition, calculateGenericTopPosition } from '@/utils/element-positions';
import Image from 'next/image';
import React from 'react'

interface Props {
    shieldResistances: {
        [key: string]: number;
    };
    handleShieldResistanceClick: (resistanceType: string, resistancePercentage: number) => void;
}

export default function AddShipModalShieldResistance({ shieldResistances, handleShieldResistanceClick }: Props) {

    const handleResistanceClick = (e: any, resistanceType: string) => {
        // Assuming `e.currentTarget` is the slider element.
        const slider = e.currentTarget;

        // Get the size of the slider and the position of the click.
        const rect = slider.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;

        // Calculate the percentage.
        const percentage = (clickPosition / rect.width) * 100;

        handleShieldResistanceClick(resistanceType, percentage);
    }

    return (
        <div
            className="absolute text-black w-[11vw]"
            style={{
                left: calculateGenericLeftPosition(1024, 1792, 17.7),
                top: calculateGenericTopPosition(1024, 1792, 75)
            }}
        >
            <h3 className="text-white">Shield</h3>
            {
                Object.entries(shieldResistances).map(([resistanceType, resistanceValue]) => {
                    return (
                        <div className="flex items-center" key={resistanceType}>
                            <div
                                className="border-2 flex items-center justify-center h-5 w-5 mr-2 rounded-full"
                                style={{
                                    borderColor: resistanceColors[resistanceType]
                                }}
                            >
                                <Image src={resistanceIcons[resistanceType]} alt={resistanceType} width={32} height={32} />
                            </div>
                            <div className="bg-[#0b131a] cursor-pointer em_resistance h-[1.5vh] rounded-r-full flex-1" onClick={(e) => handleResistanceClick(e, resistanceType)}>
                                <div
                                    className="h-full"
                                    style={{
                                        backgroundColor: resistanceColors[resistanceType],
                                        width: `${resistanceValue}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}
