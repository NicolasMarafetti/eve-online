import { HighSlot } from "./HighSlot";
import { LowSlot } from "./LowSlot";
import { MidSlot } from "./MidSlot";
import { RigSlot } from "./RigSlot";

export interface ShipFitting {
    highSlots: HighSlot[],
    midSlots: MidSlot[],
    lowSlots: LowSlot[],
    rigs: RigSlot[]
}