import { Schedule } from "./scheduleInterface";

export interface Ticket {
    schedule : Schedule
    username : string
    seatId : number
}