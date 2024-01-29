import { useState } from "react"
import styles from "./HomeFitting.module.scss";
import Fit from "../Fit";
import HomeFittingFilters from "../HomeFittingFilters";
import HomeFittingResult from "../HomeFittingResult";

export const HomeFitting = () => {

    const [simulationInProgress, setSimulationInProgress] = useState<boolean>(false);

    const simulationButtonClicked = () => {
        setSimulationInProgress(!simulationInProgress);

        setTimeout(() => {
            setSimulationInProgress(false);
        }, 3000);
    }

    return (
        <div className={`${styles.home_fitting} ${simulationInProgress ? styles.simulation_in_progress : ""} absolute bg-eve-online bg-cover bg-center flex h-screen w-screen`}>
            <div className="flex-1 flex flex-col justify-between">
                <button className="absolute left-10 top-10 bg-yellow-500 text-white w-32 h-10" onClick={simulationButtonClicked}>Simuler</button>
                <div className="flex flex-1 flex-col justify-center">
                    <Fit simulationInProgress={simulationInProgress} />
                </div>
                <HomeFittingResult />
            </div>
            <HomeFittingFilters simulationInProgress={simulationInProgress} />
        </div>
    )
}