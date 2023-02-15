import { compeareNiceDatesOnEquality, copyNiceDate, NiceDate} from "./niceDateInterface"

export interface Schedule {
    movieId: number,
    hallId: number,
    dateTime: NiceDate
}

export function copySchedule (old : Schedule) : Schedule {
    return {
        hallId: old.hallId,
        movieId: old.hallId,
        dateTime: copyNiceDate(old.dateTime)
    } as Schedule
}

/**
 * compares two Schedules
 * 
 * @param a schedule a
 * @param b schedule b
 * @returns true if equal else false
 */
export function compareSchedules(a: Schedule, b: Schedule): boolean {
    return a.hallId == b.hallId && a.movieId == b.movieId 
    && compeareNiceDatesOnEquality(a.dateTime, b.dateTime)
}