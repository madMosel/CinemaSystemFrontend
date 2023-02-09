export enum SeatCategory {
    Normal = "Normal",
    Premium = "Premium",
    Handicap = "Handicap"
}

export enum SeatState {
    FREE ="FREE ",
    RESERVED = "RESERVED",
    BOOKED = "BOOKED",
}

export class Seat {
    constructor (
        public id: number,
        public category: SeatCategory,
        public state: SeatState
    ) 
    { }
}

export const dummySeat:Seat = new Seat(-1, SeatCategory.Normal, SeatState.FREE)