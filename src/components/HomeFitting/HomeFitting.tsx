import { useState } from "react"
import styles from "./HomeFitting.module.scss";

export const HomeFitting = () => {

    const [simulationInProgress, setSimulationInProgress] = useState<boolean>(false);

    const simulationButtonClicked = () => {
        setSimulationInProgress(!simulationInProgress);
    }

    return (
        <div className={`${styles.home_fitting} ${simulationInProgress ? styles.simulation_in_progress : ""} absolute bg-eve-online bg-cover bg-center h-screen w-screen`}>
            <button className="absolute right-48 top-48 bg-yellow-500 text-white w-32 h-10" onClick={simulationButtonClicked}>Simuler</button>
        </div>
    )
}