export interface NiceDate {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
}


export function equals(a: NiceDate, b: NiceDate): boolean {
    return a.year == b.year
        && a.month == b.month
        && a.day == b.day
        && a.hour == b.hour
        && a.minute == b.minute
}

export function niceDateToString(date: NiceDate): string {
    return (date.day < 10 ? "0" : "") + date.day + "." +
        (date.month < 10 ? "0" : "") + date.month + "." + date.year
        + " " + (date.hour < 10 ? "0" : "") + date.hour + ":" + (date.minute < 10 ? "0" : "") + date.minute
}


export function parseToDate(date: NiceDate): Date {
    return new Date(date.year + "-" + (date.month) + "-" + date.day + " " + date.hour + ":" + date.minute)
}


export function copyNiceDate(nd: NiceDate): NiceDate {
    return {
        year: nd.year,
        month: nd.month,
        day: nd.day,
        hour: nd.hour,
        minute: nd.minute
    } as NiceDate
}


function parseToNiceDate(date: Date) : NiceDate {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
    } as NiceDate
}


export function compareNiceDatesOnTime(a: NiceDate, b: NiceDate): number {
    let diff: number
    if ((diff = a.year - b.year) != 0) return diff
    if ((diff = a.month - b.month) != 0) return diff
    if ((diff = a.day - b.day) != 0) return diff
    if ((diff = a.hour - b.hour) != 0) return diff
    if ((diff = a.minute - b.minute) != 0) return diff
    return 0
}

export function compeareNiceDatesOnEquality(a: NiceDate, b: NiceDate): boolean {
    return a.year == b.year
        && a.month == b.month
        && a.day == b.day
        && a.hour == b.hour
        && a.minute == b.minute
}

export function niceDateAddMinutes(nd: NiceDate, minutes: number) : NiceDate {
    let date = parseToDate(nd)
    date.setMinutes(date.getMinutes() + minutes)
    return parseToNiceDate(date)
}

