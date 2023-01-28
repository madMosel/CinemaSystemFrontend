import { scheduled } from "rxjs"

export interface Schedule {
    movieId: number,
    hallId: number,
    dateTime: Date,
}

/**
 * compares two Schedules
 * 
 * @param a schedule a
 * @param b schedule b
 * @returns true if equal else false
 */
export function compareSchedules (a : Schedule, b: Schedule) : boolean {
    return a.hallId === b.hallId && a.movieId === b.movieId && a.dateTime.getTime() === b.dateTime.getTime()
}

export interface ScheduleEntry {
    hallString : string,
    titleString : string,
    durationString : string,
    dateString: string,
    classString : string
 }