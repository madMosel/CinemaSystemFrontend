import { Schedule } from "./scheduleInterface";

export interface Ticket {
    schedule : Schedule
    username : string
    seatId : number
    price? : number
}

// function ticketToString(ticket : Ticket) : string {

// }