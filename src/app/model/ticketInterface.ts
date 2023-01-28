import { Schedule } from "./scheduleInterface";

export interface Ticket {
    schedule : Schedule
    userId : number
    seatId : number
}