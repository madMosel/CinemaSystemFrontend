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
export function compareSchedules(a: Schedule, b: Schedule): boolean {
    let at = a.dateTime
    let bt = b.dateTime
    return a.hallId === b.hallId && a.movieId === b.movieId
        && at.getFullYear() == bt.getFullYear()
        && at.getMonth() == bt.getMonth()
        && at.getDay() == bt.getDay()
        && at.getHours() == bt.getHours()
        && at.getMinutes() == bt.getMinutes()
}

export interface ScheduleEntry {
    hallString: string,
    titleString: string,
    durationString: string,
    dateString: string,
    classString: string,
    index: number,
}


export interface ScheduleDateAdapter {
    movieId: number,
    hallId: number,
    dateTime: string
}


function parseToScheduleDateAdapter(schedule: Schedule): ScheduleDateAdapter {
    let date = schedule.dateTime
    let timeString: string = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes()
    return { hallId: schedule.hallId, movieId: schedule.movieId, dateTime: timeString } as ScheduleDateAdapter
}

/**
 * This dirty shity peace of code is needed because json will 
 * parse a date in this! format: 2023-01-28T17:45:39.141Z 
 * while DONT HAVING CONSTRUCTOR to create time from this argument! 
 * So, JSON.parse(JSON.stringify(new Date())) fails!  
 * @param schedules 
 * @returns the schedules as String that can be processed by 
 * JSON.parse(schedules.json file created using this mehtod)
 */
export function stringifySchedules(schedules: Schedule[]): string {
    let adapted: ScheduleDateAdapter[] = []
    for (let schedule of schedules) adapted.push(parseToScheduleDateAdapter(schedule))
    return JSON.stringify(adapted)
}

export function parseScheduleAdaptersToSchedules(scheduleAdapters: ScheduleDateAdapter[]): Schedule[] {
    let schedules: Schedule[] = []
    for (let adapter of scheduleAdapters) schedules.push({ hallId: adapter.hallId, movieId: adapter.movieId, dateTime: new Date(adapter.dateTime) } as Schedule)
    return schedules
}
