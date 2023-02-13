import { CinemaHall } from "./cinemaHallInterface"
import { Movie } from "./movieInterface"
import { Schedule } from "./scheduleInterface"

export enum SeatCategory {
    NORMAL = "NORMAL",
    PREMIUM = "PREMIUM",
    HANDICAP = "HANDICAP"
}

export enum SeatState {
    FREE = "FREE",
    RESERVED = "RESERVED",
    BOOKED = "BOOKED",
}

export interface Seat {
    id: number,
    category: SeatCategory,
    state: SeatState,
    belongsToLocalUser? : boolean
}

export const dummySeat: Seat = {
    id: 0,
    category: SeatCategory.NORMAL,
    state: SeatState.FREE
} as Seat
