import { useState } from "react"
import styles from "./HomeFitting.module.scss";
import Fit from "../Fit";
import HomeFittingFilters from "../HomeFittingFilters";
import HomeFittingResult from "../HomeFittingResult";
import { Ship } from "@/types/Ship";
import { ShipFitting } from "@/types/ShipFitting";
import { highSlotsEquipments } from "@/const/highSlotsEquipments";
import { mediumSlotsEquipments } from "@/const/mediumSlotsEquipments";
import { lowSlotsEquipments } from "@/const/lowSlotsEquipments";
import { rigSlotsEquipments } from "@/const/rigSlotsEquipments";

export const HomeFitting = () => {

    const [simulationInProgress, setSimulationInProgress] = useState<boolean>(false);
    const [ship, setShip] = useState<Ship>({
        id: "1",
        name: "Omen",
        imageSrc: "/images/ships/omen.jpeg",
        highSlots: 5,
        midSlots: 6,
        lowSlots: 3
    });
    const [fit, setFit] = useState<ShipFitting>({
        highSlots: Array(ship.highSlots).fill({ status: 'offline' }),
        midSlots: Array(ship.midSlots).fill({ status: 'offline' }),
        lowSlots: Array(ship.lowSlots).fill({ status: 'offline' }),
        rigs: Array(3).fill({ status: 'offline' }),
    });

    const simulationButtonClicked = () => {
        setSimulationInProgress(!simulationInProgress);

        setFit({
            highSlots: Array(ship.highSlots).fill({ status: 'loading' }),
            midSlots: Array(ship.midSlots).fill({ status: 'loading' }),
            lowSlots: Array(ship.lowSlots).fill({ status: 'loading' }),
            rigs: Array(3).fill({ status: 'loading' }),
        })

        setTimeout(() => {
            setSimulationInProgress(false);
            setFit({
                highSlots: Array(ship.highSlots).fill({
                    ...highSlotsEquipments[0],
                    status: 'online'
                }),
                midSlots: Array(ship.midSlots).fill({
                    ...mediumSlotsEquipments[0],
                    status: 'online'
                }),
                lowSlots: Array(ship.lowSlots).fill({
                    ...lowSlotsEquipments[0],
                    status: 'online'
                }),
                rigs: Array(3).fill({
                    ...rigSlotsEquipments[0],
                    status: 'online'
                })
            })
        }, 3000);
    }

    return (
        <div className={`${styles.home_fitting} ${simulationInProgress ? styles.simulation_in_progress : ""} absolute bg-eve-online bg-cover bg-center flex h-screen w-screen`}>
            <div className="flex-1 flex flex-col justify-between">
                <button className="absolute left-10 top-10 bg-yellow-500 text-white w-32 h-10" onClick={simulationButtonClicked}>Simuler</button>
                <div className="flex flex-1 flex-col justify-center">
                    <Fit fit={fit} ship={ship} />
                </div>
                <HomeFittingResult />
            </div>
            <HomeFittingFilters simulationInProgress={simulationInProgress} />
        </div>
    )
}