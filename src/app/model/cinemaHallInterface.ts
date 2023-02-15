import { Seat, SeatCategory, SeatState } from "./seatInterface";


export interface CinemaHall {
    hallId: number,
    hallName: string,
    seats: Seat[][],
    dolby: boolean,
    d3: boolean,
    d4: boolean
}

export function copyCinemaHall(h: CinemaHall): CinemaHall {
    let seatsCopy: Seat[][] = []
    for (let row of h.seats) {
        let cpRow: Seat[] = []
        for (let seat of row) {
            cpRow.push({
                id: seat.id,
                category: seat.category,
                state: seat.state
            } as Seat)
        }
        seatsCopy.push(cpRow)
    }

    return {
        hallId: h.hallId,
        hallName: h.hallName,
        seats: seatsCopy,
        dolby: h.dolby,
        d3: h.d3,
        d4: h.d4
    } as CinemaHall
}

const dummySeat: Seat = {
    id: 0,
    category: SeatCategory.NORMAL,
    state: SeatState.FREE
} as Seat
const dummyRow: Seat[] = [dummySeat]
const dummySeats: Seat[][] = [dummyRow]
export const dummyCinemaHall: CinemaHall = {
    hallId: -1,
    hallName: "dummy Hall",
    seats: dummySeats,
    dolby: false,
    d3: false,
    d4: false
} as CinemaHall