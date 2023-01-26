export interface Schedule {
    movieId: number,
    hallId: number,
    dateTime: Date
}

export interface ScheduleEntry {
    displayString : string, //movie or hall name
    date: Date
 }