import { Injectable } from "@angular/core";
import { CinemaHall } from "./cinemaHallInterface";
import { Movie } from "./movieInterface";
import { Schedule } from "./scheduleInterface";
import { Ticket } from "./ticketInterface";
import { UserAccount } from "./userAccountInterface";

import mockCinemas from '../../assets/mockCinemas.json';
import mockMovies from '../../assets/mockMovies.json'

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

        //mocking schedules
        this.schedules.push(
            {
                movieId: this.movies[0].movieId,
                hallId: this.cinemaHalls[0].hallId,
                dateTime: new Date("2023-4-4")
            } as Schedule
        )
        this.schedules.push(
            {
                movieId: this.movies[1].movieId,
                hallId: this.cinemaHalls[1].hallId,
                dateTime: new Date("2023-3-3")
            } as Schedule
        )
        this.schedules.push(
            {
                movieId: this.movies[0].movieId,
                hallId: this.cinemaHalls[1].hallId,
                dateTime: new Date("2023-2-2")
            } as Schedule
        )
        this.schedules.push(
            {
                movieId: this.movies[1].movieId,
                hallId: this.cinemaHalls[0].hallId,
                dateTime: new Date("2023-1-1")
            } as Schedule
        )
        // console.log(this.schedules)
        // console.log(this.getSchedulesOfHall(0))
        // console.log(this.getSchedulesOfHall(1))
        // console.log(this.getSchedulesOfMovie(0))
        // console.log(this.getSchedulesOfMovie(1))


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
        let newStart = schedule.dateTime.getTime()
        let newEnd = newStart + (this.movieMap!.get(schedule.movieId)!.duration + this.minutesOffset) * 60000
        for (let exisitingSchedule of schedulesOfHall) {
            let exisitingStart = exisitingSchedule.dateTime.getTime()
            let existingEnd = exisitingStart + this.movieMap!.get(exisitingSchedule.movieId)!.duration * 60000

            if ((exisitingStart > newStart && exisitingStart < newEnd)
                || (existingEnd > exisitingStart && existingEnd < newEnd)
                || (exisitingStart <= newStart && existingEnd >= newEnd)
                || (exisitingStart >= newEnd && existingEnd <= newEnd)
            ) return { ...exisitingSchedule }
        }
        this.schedules.push(schedule)
        return null
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