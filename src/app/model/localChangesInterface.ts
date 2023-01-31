import { CinemaHall } from "./cinemaHallInterface";
import { Movie } from "./movieInterface";
import { Schedule } from "./scheduleInterface";

export interface LocalChanges {
    deleteHalls: CinemaHall[],
    deleteMovies: Movie[],
    deleteSchedules: Schedule[],
    newHalls: CinemaHall[],
    newMovies: Movie[],
    newSchedules: Schedule[]    
    newHallCounter : number
    newMovieCounter : number
}
