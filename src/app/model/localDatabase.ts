import { Injectable } from "@angular/core";
import { CinemaHall } from "./cinemaHallInterface";
import { Movie } from "./movieInterface";
import { parseScheduleAdaptersToSchedules, Schedule, ScheduleDateAdapter } from "./scheduleInterface";
import { Ticket } from "./ticketInterface";
import { UserAccount } from "./userAccountInterface";

import mockCinemas from '../../assets/mockCinemas.json';
import mockMovies from '../../assets/mockMovies.json'
import mockSchedules from '../../assets/mockSchedules.json'

export enum OperationFeedback {
    OK,
    NO_SUCH_HALL,
    NO_SUCH_MOVIE,
    NO_SUCH_SCHEDULE,
    NOT_IMPLEMENTED
}

@Injectable({
    providedIn: 'root',
})



export class LocalDatabase {
    private cinemaHalls: CinemaHall[] = []
    private movies: Movie[] = []
    private schedules: Schedule[] = []
    private localUser?: UserAccount
    private tickets: Ticket[] = []

    private hallMap?: Map<number, CinemaHall>
    private movieMap?: Map<number, Movie>

    private minutesOffset: number = 15

    constructor() {
        this.cinemaHalls = mockCinemas as CinemaHall[]
        this.movies = mockMovies as Movie[]
        this.schedules = parseScheduleAdaptersToSchedules(mockSchedules)

        //load all visible data from database

        this.createMaps()
    }

    public getHallById(hallId: number): CinemaHall | null {
        for (let hall of this.cinemaHalls) if (hall.hallId === hallId) return { ...hall }
        return null;
    }

    public getHalls(): CinemaHall[] {
        let cinemHallsCopy: CinemaHall[] = [...this.cinemaHalls]
        return cinemHallsCopy
    }

    public getMovieById(movieId: number): Movie | null {
        for (let movie of this.movies) if (movie.movieId === movieId) return { ...movie }
        return null
    }

    public getMovies(): Movie[] {
        let moviesCopy: Movie[] = [...this.movies]
        return moviesCopy
    }

    public getSchedulesOfHall(hallId: number): Schedule[] {
        let hallSchedules: Schedule[] = []
        for (let schedule of this.schedules) if (schedule.hallId === hallId) hallSchedules.push({ ...schedule })
        return hallSchedules
    }

    public getSchedulesOfMovie(movieId: number): Schedule[] {
        let movieSchedules: Schedule[] = []
        for (let schedule of this.schedules) if (schedule.movieId === movieId) movieSchedules.push({ ...schedule })
        return movieSchedules
    }

    public getSchedules(): Schedule[] {
        return [...this.schedules]
    }

    public filterSchedulesByHallId(schedules: Schedule[], hallId: number): Schedule[] {
        let filtered: Schedule[] = []
        for (let schedule of schedules) if (schedule.hallId == hallId) filtered.push(schedule)
        return filtered
    }

    public putHall(hall: CinemaHall): OperationFeedback {
        return OperationFeedback.NOT_IMPLEMENTED
    }

    /**
     * Puts the schedule in the local Database if no conflicts detected
     * @param schedule Schedule to be added
     * @returns null on Succes, a copy of the conflicting Schedule on error
     */
    public putSchedule(schedule: Schedule): Schedule | null {
        let schedulesOfHall = this.filterSchedulesByHallId(this.schedules, schedule.hallId)
        let newStart = schedule.dateTime
        let newEnd : Date = new Date(newStart)
        console.log(newEnd.getHours())
        newEnd.setMinutes(12)

        for (let exisitingSchedule of schedulesOfHall) {
            let exisitingStart = exisitingSchedule.dateTime
            let existingEnd =  new Date (exisitingStart)
            existingEnd.setMinutes(this.movieMap!.get(exisitingSchedule.movieId)!.duration)

            if (
                (this.compareDates(exisitingStart, newStart) > 0 && this.compareDates(exisitingStart, newEnd) < 0)
                || (this.compareDates(existingEnd, newStart) > 0 && this.compareDates(existingEnd, newEnd) < 0)
                || (this.compareDates(exisitingStart, newStart) < 0 && this.compareDates(existingEnd, newEnd) > 0)
                || (this.compareDates(exisitingStart, newEnd) > 0 && this.compareDates(existingEnd, newEnd) < 0)
            ) {
                console.log(newStart)
                console.log(exisitingStart)
                console.log((new Date(existingEnd)))
                console.log("Conflict!")
                return { ...exisitingSchedule }
            }
        }
        this.schedules.push(schedule)
        return null
    }

    public compareDates(a: Date, b: Date): number {
        if (a.getFullYear() != b.getFullYear()) return b.getFullYear() - a.getFullYear()
        if (a.getMonth() != b.getMonth()) return b.getMonth() - a.getMonth()
        if (b.getDay() != a.getDay()) return b.getDay() - a.getDay()
        if (b.getHours() != a.getHours()) return b.getHours() - a.getHours()
        return b.getSeconds() - a.getSeconds()
    }

    public putTicket(ticket: Ticket): OperationFeedback {
        return OperationFeedback.NOT_IMPLEMENTED
    }

    createMovieMap() {
        this.movieMap = new Map
        for (let movie of this.movies) this.movieMap.set(movie.movieId, movie)
    }

    createHallMap() {
        this.hallMap = new Map
        for (let hall of this.cinemaHalls) this.hallMap.set(hall.hallId, hall)
    }


    createMaps() {
        this.createHallMap()
        this.createMovieMap()
    }
}