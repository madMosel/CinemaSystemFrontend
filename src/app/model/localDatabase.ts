import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { CinemaHall } from "./cinemaHallInterface";
import { compareMovies, Movie } from "./movieInterface";
import { compareSchedules, parseScheduleAdaptersToSchedules, Schedule, ScheduleDateAdapter, stringifySchedules } from "./scheduleInterface";
import { Ticket } from "./ticketInterface";
import { UserAccount } from "./userAccountInterface";

import mockCinemas from '../../assets/mockCinemas.json';
import mockMovies from '../../assets/mockMovies.json'
import mockSchedules from '../../assets/mockSchedules.json'

export enum OperationFeedback {
    OK = "OK",
    NO_SUCH_HALL = "NO_SUCH_HALL",
    NO_SUCH_MOVIE = "NO_SUCH_MOVIE",
    NO_SUCH_SCHEDULE = "NO_SUCH_SCHEDULE",
    NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
    HAS_REFERING_OBJECTS = "HAS_REFERING_OBJECTS"
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
        this.createMaps()
    }

    async loadHallsFromServer() {
        this.cinemaHalls = mockCinemas as CinemaHall[]
    }

    async loadMoviesFromServer() {
        this.movies = mockMovies as Movie[]
    }

    async loadSchedulesFromServer() {
        this.schedules = parseScheduleAdaptersToSchedules(mockSchedules)
    }

    async loadTicketsFromServer() {

    }


    async loadHalls() {
        if (!localStorage.getItem("dbData")) this.loadHallsFromServer()
        else this.cinemaHalls = JSON.parse(localStorage.getItem("dbData-halls")!) as CinemaHall[]
        this.createHallMap()
    }

    async loadMovies() {
        if (!localStorage.getItem("dbData")) this.loadMoviesFromServer()
        else this.movies = JSON.parse(localStorage.getItem("dbData-movies")!)
        this.createMovieMap()
    }

    async loadSchedules() {
        if (!localStorage.getItem("dbData")) this.loadSchedulesFromServer()
        else this.schedules = parseScheduleAdaptersToSchedules(JSON.parse(localStorage.getItem("dbData-schedules")!))
    }

    async loadTickets() {
        if (!localStorage.getItem("dbData")) this.loadTicketsFromServer()
        else this.tickets = []
    }

    async load() {
        this.loadHalls()
        this.loadMovies()
        this.loadSchedules()
    }


    updateStorage(): void {
        console.log("cleared...")
        localStorage.clear()
        localStorage.setItem("dbData", "has data")
        localStorage.setItem("dbData-halls", JSON.stringify(this.cinemaHalls))
        localStorage.setItem("dbData-movies", JSON.stringify(this.movies))
        localStorage.setItem("dbData-schedules", stringifySchedules(this.schedules))
        localStorage.setItem("dbData-tickets", JSON.stringify(this.tickets))
        if (this.localUser) localStorage.setItem("dbData-user", JSON.stringify(this.localUser))
    }


    public getHallById(hallId: number): CinemaHall | null {
        this.loadHalls()
        for (let hall of this.cinemaHalls) if (hall.hallId === hallId) return { ...hall }
        return null;
    }

    public getHalls(): CinemaHall[] {
        this.loadHalls()
        let cinemHallsCopy: CinemaHall[] = [...this.cinemaHalls]
        return cinemHallsCopy
    }

    public getMovieById(movieId: number): Movie | null {
        this.loadMovies()
        for (let movie of this.movies) if (movie.movieId === movieId) return { ...movie }
        return null
    }

    public getMovies(): Movie[] {
        this.loadMovies()
        let moviesCopy: Movie[] = [...this.movies]
        return moviesCopy
    }

    public getSchedulesOfHall(hallId: number): Schedule[] {
        this.loadHalls()
        this.loadSchedules()
        let hallSchedules: Schedule[] = []
        for (let schedule of this.schedules) if (schedule.hallId === hallId) hallSchedules.push({ ...schedule })
        return hallSchedules
    }

    public getSchedulesOfMovie(movieId: number): Schedule[] {
        this.loadHalls()
        this.loadSchedules()
        let movieSchedules: Schedule[] = []
        for (let schedule of this.schedules) if (schedule.movieId === movieId) movieSchedules.push({ ...schedule })
        return movieSchedules
    }

    public getSchedules(): Schedule[] {
        this.loadSchedules()
        return [...this.schedules]
    }

    public filterSchedulesByHallId(schedules: Schedule[], hallId: number): Schedule[] {
        this.loadSchedules()
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
        this.loadSchedules()
        let schedulesOfHall = this.filterSchedulesByHallId(this.schedules, schedule.hallId)
        let newStart = schedule.dateTime
        let newEnd: Date = new Date(newStart)
        console.log(newEnd.getHours())
        newEnd.setMinutes(12)

        for (let exisitingSchedule of schedulesOfHall) {
            let exisitingStart = exisitingSchedule.dateTime
            let existingEnd = new Date(exisitingStart)
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
        this.updateStorage()
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

    public deleteSchedule(schedule: Schedule) {
        this.loadSchedules()
        for (let s of this.schedules) if (compareSchedules(schedule, s)) {
            this.schedules.splice(this.schedules.indexOf(s, 0), 1)
            this.updateStorage()
            return
        }
        this.updateStorage()
    }

    deleteMovie(movie: Movie): OperationFeedback {
        this.load()
        for (let schedule of this.schedules) if (schedule.movieId == movie.movieId) {
            console.log(schedule)
            return OperationFeedback.HAS_REFERING_OBJECTS  
        } 
        for (let ticket of this.tickets) if (ticket.schedule.movieId == movie.movieId) return OperationFeedback.HAS_REFERING_OBJECTS

        for (let m of this.movies) if (compareMovies(m, movie)) {
            this.movies.splice(this.movies.indexOf(m, 0), 1)
            this.updateStorage()
            return OperationFeedback.OK
        }
        return OperationFeedback.NO_SUCH_MOVIE
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