import React from 'react'

interface Props {
    simulationInProgress: boolean;
}

export default function DamageReceivedFilter({ simulationInProgress }: Props) {

    const minDamage = 0;
    const maxDamage = 400;

    const [damageReceived, setDamageReceived] = React.useState<number>(50);

    const calculateTooltipMarginLeft = () => {
        const minMarginLeft = 7;
        const maxMarginLeft = -7;

        return minMarginLeft + (damageReceived / 400 * (maxMarginLeft - minMarginLeft));
    }

    const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (simulationInProgress) return;

        setDamageReceived(parseInt(e.target.value));
    }

    const activityTypeClicked = (activityType: string) => {
        if (simulationInProgress) return;

        switch (activityType) {
            case 'missions_lvl_1':
                setDamageReceived(50);
                break;
            case 'missions_lvl_2':
                setDamageReceived(150);
                break;
            case 'missions_lvl_3':
                setDamageReceived(300);
                break;
            case 'missions_lvl_4':
                setDamageReceived(400);
                break;
        }
    }

    return (
        <div className="pb-[5vh] px-20">
            <p className="mb-5 text-center text-gray-500">Damage received</p>
            <div className="flex items-center justify-around mb-5 flex-wrap">
                <button className="mx-3 text-gray-300 underline" onClick={() => activityTypeClicked('missions_lvl_1')}>Missions lvl 1</button>
                <button className="mx-3 text-gray-300 underline" onClick={() => activityTypeClicked('missions_lvl_2')}>Missions lvl 2</button>
                <button className="mx-3 text-gray-300 underline" onClick={() => activityTypeClicked('missions_lvl_3')}>Missions lvl 3</button>
                <button className="mx-3 text-gray-300 underline" onClick={() => activityTypeClicked('missions_lvl_4')}>Missions lvl 4</button>
            </div>
            <label htmlFor="disabled-range" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-500">DPS received per second</label>
            <div>
                <div className="relative shadow-md w-10" style={{
                    left: `${damageReceived / 400 * 100}%`,
                    marginLeft: calculateTooltipMarginLeft(),
                    transform: 'translateX(-50%)'
                }}>
                    <div className="bg-white text-black truncate text-center text-sm rounded py-1">{damageReceived}</div>
                    <svg className="absolute text-white w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255">
                        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                    </svg>
                </div>
                <input id="disabled-range" min={minDamage} max={maxDamage} type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={inputChanged} value={damageReceived} />
            </div>
        </div>
    )
}
