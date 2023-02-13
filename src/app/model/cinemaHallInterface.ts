import { Seat, SeatCategory, SeatState } from "./seatInterface";


export class CinemaHall {


    constructor(
        public hallId: number,
        public hallName: string,
        public seats: Seat[][],
        public dolby: boolean,
        public d3: boolean,
        public d4: boolean
    ) {

    }
}

export function copyCinemaHall(h: CinemaHall): CinemaHall {
    let seatsCopy: Seat[][] = []
    for (let row of h.seats) {
        let cpRow : Seat[] = []
        for (let seat of row) {
            cpRow.push({
                id: seat.id,
                category: seat.category,
                state: seat.state
            } as Seat )
        }
        seatsCopy.push(cpRow)
    }

    return new CinemaHall(h.hallId, h.hallName, seatsCopy, h.dolby, h.d3, h.d4)
}

const dummySeat: Seat = {
    id: 0,
    category: SeatCategory.NORMAL,
    state: SeatState.FREE
} as Seat
const dummyRow: Seat[] = [dummySeat]
const dummySeats: Seat[][] = [dummyRow]
export const dummyCinemaHall: CinemaHall = new CinemaHall(-1, "dummy Hall", dummySeats, false, false, false)