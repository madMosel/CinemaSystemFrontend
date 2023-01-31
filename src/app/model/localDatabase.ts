import { Injectable, ModuleWithProviders, NgModule, OnDestroy, OnInit, Optional, SkipSelf } from "@angular/core";
import { CinemaHall } from "./cinemaHallInterface";
import { compareMovies, Movie } from "./movieInterface";
import { compareSchedules, Schedule } from "./scheduleInterface";
import { Ticket } from "./ticketInterface";
import { UserAccount } from "./userAccountInterface";

import mockCinemas from '../../assets/mockCinemas.json';
import mockMovies from '../../assets/mockMovies.json'
import mockSchedules from '../../assets/mockSchedules.json'
import { LocalChanges } from "./localChangesInterface";
import { compareNiceDatesOnTime, NiceDate, niceDateAddMinutes } from "./niceDateInterface";
import { CommonModule } from "@angular/common";

export enum OperationFeedback {
    OK = "OK",
    NO_SUCH_HALL = "NO_SUCH_HALL",
    NO_SUCH_MOVIE = "NO_SUCH_MOVIE",
    NO_SUCH_SCHEDULE = "NO_SUCH_SCHEDULE",
    NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
    HAS_REFERING_OBJECTS = "HAS_REFERING_OBJECTS",
    HAS_INDEX = "HAS_INDEX"
}

@Injectable({
    providedIn: 'root',
})

@NgModule({
    imports: [CommonModule]
})



export class LocalDatabase {
    public static counter: number = 0;

    public logCounter () {console.log(LocalDatabase.counter++)}

    private halls: CinemaHall[] = []
    private movies: Movie[] = []
    private schedules: Schedule[] = []
    private localUser?: UserAccount
    private tickets: Ticket[] = []
    private changes: LocalChanges = {
        halls: [], movies: [], schedules: [],
        deleteHalls: [], deleteMovies: [], deleteSchedules: [],
        newHallCounter: -1, newMovieCounter: -1
    } as LocalChanges



    private hallMap?: Map<number, CinemaHall>
    private movieMap?: Map<number, Movie>

    private minutesOffset: number = 15

    constructor() {
        this.logCounter()
        this.load()
    }

    async loadHallsFromServer() {
        this.halls = mockCinemas as CinemaHall[]
    }

    async loadMoviesFromServer() {
        this.movies = mockMovies as Movie[]
    }

    async loadSchedulesFromServer() {
        this.schedules = mockSchedules as Schedule[]
    }

    async loadTicketsFromServer() {

    }

    async load() {
        this.loadHallsFromServer()
        this.loadMoviesFromServer()
        this.loadSchedulesFromServer()
        this.loadTicketsFromServer()
        this.createMaps()
    }


    public getHallById(hallId: number): CinemaHall | null {
        
        for (let hall of this.halls) if (hall.hallId === hallId) return { ...hall }
        return null;
    }

    public getHalls(): CinemaHall[] {
        
        let cinemHallsCopy: CinemaHall[] = [...this.halls]
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
        
        return this.schedules
    }

    public filterSchedulesByHallId(schedules: Schedule[], hallId: number): Schedule[] {
        
        let filtered: Schedule[] = []
        for (let schedule of schedules) if (schedule.hallId == hallId) filtered.push(schedule)
        return filtered
    }

    public putHall(hall: CinemaHall) {
        this.load()
        if (hall.hallId == 0) hall.hallId = this.changes.newHallCounter--
        this.findAndReplaceElseAddHall(hall)
        
    }


    deleteHall(hall: CinemaHall): OperationFeedback {
        this.load()
        for (let schedule of this.schedules) if (schedule.hallId == hall.hallId) {
            console.log(schedule)
            return OperationFeedback.HAS_REFERING_OBJECTS
        }
        for (let ticket of this.tickets) if (ticket.schedule.hallId == hall.hallId) return OperationFeedback.HAS_REFERING_OBJECTS

        this.findAndRemoveHall(hall)
        if (hall.hallId > 0) this.changes.deleteHalls.push(hall)

        
        return OperationFeedback.OK

    }


    public putTicket(ticket: Ticket): OperationFeedback {
        return OperationFeedback.NOT_IMPLEMENTED
    }


    public putMovie(movie: Movie) {
        /*
         * is created                       => put it in movies and add to changes.movies
         * is edited and new                => exchange it in movies and exchange changes.movies
         * is edited first and exists       => exchange it in movies and add add to changes.movies
         * is edited further and exists     => exchange it in movies and exchagne in change.movie
         */

        this.load()
        if (movie.movieId == 0) movie.movieId = this.changes.newMovieCounter--
        this.findAndReplaceElseAddMovie(movie)
        
    }

    deleteMovie(movie: Movie) {
        /*
         * 1. check for refering objects
         * 2.:
         *    is new                  => delete from movies and change.movies
         *    exists and unchanged    => remove from movies and change.movies
         *    exists and changed      => remove from movies and change.movies and add to change.deleteMovies
         */

        this.load()
        for (let schedule of this.schedules) if (schedule.movieId == movie.movieId) {
            console.log(schedule)
            return OperationFeedback.HAS_REFERING_OBJECTS
        }
        for (let ticket of this.tickets) if (ticket.schedule.movieId == movie.movieId) return OperationFeedback.HAS_REFERING_OBJECTS

        this.findAndRemoveMovie(movie)
        if (movie.movieId > 0) this.changes.deleteMovies.push(movie)

        
        return OperationFeedback.OK

    }


    /**
     * Puts the schedule in the local Database if no conflicts detected
     * @param schedule Schedule to be added
     * @returns null on Succes, a copy of the conflicting Schedule on error
     */
    public putSchedule(schedule: Schedule): Schedule | null {
        
        let schedulesOfHall = this.filterSchedulesByHallId(this.schedules, schedule.hallId)
        let newStart: NiceDate = schedule.dateTime
        let newEnd: NiceDate = niceDateAddMinutes(newStart, this.movieMap!.get(schedule.movieId)!.duration)

        for (let exisitingSchedule of schedulesOfHall) {
            let existingStart = exisitingSchedule.dateTime
            let existingEnd = niceDateAddMinutes(existingStart, this.movieMap!.get(exisitingSchedule.movieId)!.duration)
            if (
                (compareNiceDatesOnTime(existingStart, newStart) >= 0 && compareNiceDatesOnTime(existingStart, newEnd) <= 0)
                || (compareNiceDatesOnTime(existingEnd, newStart) >= 0 && compareNiceDatesOnTime(existingEnd, newEnd) <= 0)
                || (compareNiceDatesOnTime(existingStart, newStart) <= 0 && compareNiceDatesOnTime(existingEnd, newEnd) >= 0)
                || (compareNiceDatesOnTime(existingStart, newStart) >= 0 && compareNiceDatesOnTime(existingEnd, newEnd) <= 0)
            ) {
                console.log(newStart)
                console.log(existingStart)
                console.log(existingEnd)
                console.log("Conflict!")
                return { ...exisitingSchedule }
            }
        }
        this.schedules.push(schedule)
        this.changes.schedules.push(schedule)
        
        return null
    }


    public deleteSchedule(schedule: Schedule) {
        for (let s of this.schedules) if (compareSchedules(schedule, s)) {
            this.schedules.splice(this.schedules.indexOf(s, 0), 1)

            let foundInChanges = false
            for (let ns of this.changes.schedules) if (compareSchedules(ns, schedule)) {
                foundInChanges = true
                this.changes.schedules.splice(this.changes.schedules.indexOf(ns), 1)
                break
            }
            if (!foundInChanges) this.changes.deleteSchedules.push(schedule)
            return
        }
    }

    createMovieMap() {
        this.movieMap = new Map
        for (let movie of this.movies) this.movieMap.set(movie.movieId, movie)
    }

    createHallMap() {
        this.hallMap = new Map
        for (let hall of this.halls) this.hallMap.set(hall.hallId, hall)
    }


    createMaps() {
        this.createHallMap()
        this.createMovieMap()
    }

    findAndReplaceElseAddHall(hall: CinemaHall) {
        this.findAndRemoveHall(hall)
        this.changes.halls.push(hall)
        this.halls.push(hall)
    }

    findAndRemoveHall(hall: CinemaHall) {
        for (let h of this.halls) if (h.hallId == hall.hallId) {
            this.changes.halls.splice(this.changes.halls.indexOf(h), 1)
        }
        for (let m of this.halls) if (m.hallId == hall.hallId) {
            this.halls.splice(this.halls.indexOf(m), 1)
        }
    }

    findAndReplaceElseAddMovie(movie: Movie) {
        this.findAndRemoveMovie(movie)
        this.changes.movies.push(movie)
        this.movies.push(movie)
    }

    findAndRemoveMovie(movie: Movie) {
        for (let m of this.movies) if (m.movieId == movie.movieId) {
            this.changes.movies.splice(this.changes.movies.indexOf(m), 1)
        }
        for (let m of this.movies) if (m.movieId == movie.movieId) {
            this.movies.splice(this.movies.indexOf(m), 1)
        }
    }
}