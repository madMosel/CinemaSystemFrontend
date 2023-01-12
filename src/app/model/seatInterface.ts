export enum SeatCategory {
    Normal = 0,
    Premium = 1,
    Handicap = 2
}

export class Seat {
    constructor (
        public hallId: number,
        public id: number,
        public category: SeatCategory
    ) 
    { }
}