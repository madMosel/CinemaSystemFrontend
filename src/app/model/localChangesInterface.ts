import { CinemaHall } from "./cinemaHallInterface";
import { Movie } from "./movieInterface";
import { Schedule } from "./scheduleInterface";

export interface LocalChanges {
    halls: CinemaHall[],
    movies: Movie[],
    schedules: Schedule[],
    deleteHalls: CinemaHall[],
    deleteMovies: Movie[],
    deleteSchedules: Schedule[],
    newHallCounter : number,
    newMovieCounter : number
}
