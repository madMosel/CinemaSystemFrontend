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

    constructor() {
        this.cinemaHalls = mockCinemas as CinemaHall[]
        this.movies = mockMovies as Movie[]

        //mocking schedules
        this.schedules.push(
            {
                movieId: this.movies[0].movieId,
                hallId: this.cinemaHalls[0].hallId,
                dateTime: new Date(1000)
            } as Schedule
        )
        this.schedules.push(
            {
                movieId: this.movies[1].movieId,
                hallId: this.cinemaHalls[1].hallId,
                dateTime: new Date(2000)
            } as Schedule
        )
        this.schedules.push(
            {
                movieId: this.movies[0].movieId,
                hallId: this.cinemaHalls[1].hallId,
                dateTime: new Date(500)
            } as Schedule
        )
        this.schedules.push(
            {
                movieId: this.movies[1].movieId,
                hallId: this.cinemaHalls[0].hallId,
                dateTime: new Date(500)
            } as Schedule
        )
        console.log(this.schedules)
        console.log(this.getSchedulesOfHall(0))
        console.log(this.getSchedulesOfHall(1))
        console.log(this.getSchedulesOfMovie(0))
        console.log(this.getSchedulesOfMovie(1))


        //load all visible data from database
    }

    public getHallById(hallId: number): CinemaHall | null {
        for (let hall of this.cinemaHalls) if (hall.hallId === hallId) return {...hall}
        return null;
    }

    public getHalls(): CinemaHall[] {
        let cinemHallsCopy: CinemaHall[] = [...this.cinemaHalls]
        return cinemHallsCopy
    }

    public getMovieById(movieId: number): Movie | null {
        for (let movie of this.movies) if (movie.movieId === movieId) return {...movie}
        return null
    }

    public getMovies(): Movie[] {
        let movieCopy: Movie[] = { ...this.movies }
        return movieCopy
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

    public putHall(hall: CinemaHall): OperationFeedback {
        return OperationFeedback.NOT_IMPLEMENTED
    }

    public putSchedule(schedule: Schedule): OperationFeedback {
        return OperationFeedback.NOT_IMPLEMENTED
    }

    public putTicket(ticket: Ticket): OperationFeedback {
        return OperationFeedback.NOT_IMPLEMENTED
    }
}