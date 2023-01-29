import { scheduled } from "rxjs"
import { compeareNiceDatesOnEquality, NiceDate} from "./niceDateInterface"

export interface Schedule {
    movieId: number,
    hallId: number,
    dateTime: NiceDate
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

export interface ScheduleEntry {
    hallString: string,
    titleString: string,
    durationString: string,
    dateString: string,
    classString: string,
    index: number,
}