import { Injectable } from "@angular/core";
import { CinemaHall } from "./cinemaHallInterface";
import { Movie } from "./movieInterface";
import { Schedule } from "./scheduleInterface";
import { Ticket } from "./ticketInterface";
import { UserAccount } from "./userAccountInterface";

import mockCinemas from '../../assets/mockCinemas.json';


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
        
        //load all data from database
    }

    public getHallById(hallId: number): CinemaHall | null {
        return null;
    }

    public getHalls(): CinemaHall[] {
        let cinemHallsCopy: CinemaHall[] = [ ...this.cinemaHalls]
        return cinemHallsCopy
    }

    public getMovieById(movieId: number): Movie | null {
        return null
    }

    public getMovies(): Movie[] {
        let movieCopy: Movie[] = { ...this.movies }
        return movieCopy
    }

    public getScheduledsOfHall(hallId: number): Schedule[] {
        return []
    }

    public getScheduledsOfMovie(movieId: number): Schedule[] {
        return []
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