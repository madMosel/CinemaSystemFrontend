import { Injectable, ModuleWithProviders, NgModule, OnDestroy, OnInit, Optional, SkipSelf } from "@angular/core";
import { CinemaHall, copyCinemaHall } from "./cinemaHallInterface";
import { copyMovie, Movie } from "./movieInterface";
import { compareSchedules, copySchedule, Schedule } from "./scheduleInterface";
import { Ticket } from "./ticketInterface";

import mockCinemas from '../../assets/mockCinemas.json';
import mockMovies from '../../assets/mockMovies.json'
import mockSchedules from '../../assets/mockSchedules.json'
import { LocalChanges } from "./localChangesInterface";
import { compareNiceDatesOnTime, NiceDate, niceDateAddMinutes } from "./niceDateInterface";
import { CommonModule } from "@angular/common";
import { Login, UserType } from "./loginInteface";
import { Observable, Subject } from "rxjs";
import { toJSDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar";
import { Rating } from "./ratingInterface";

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
    private static readonly serverUrl: string = "http://127.0.0.1:3000/"

    private halls: CinemaHall[] = []
    private _hallsChange$ = new Subject<CinemaHall[]>()
    public readonly hallsChange = this._hallsChange$.asObservable()
    private copyHalls(halls: CinemaHall[]): CinemaHall[] {
        let hallsCp: CinemaHall[] = []
        for (let h of halls) hallsCp.push(copyCinemaHall(h))
        return hallsCp
    }
    private notifyHallsChange() { this._hallsChange$.next(this.copyHalls(this.halls)) }

    private movies: Movie[] = []
    private _moviesChange$ = new Subject<Movie[]>()
    public moviesChange = this._moviesChange$.asObservable()
    private copyMovies(movies: Movie[]): Movie[] {
        let moviesCp: Movie[] = []
        for (let m of movies) moviesCp.push(copyMovie(m))
        return moviesCp
    }
    private notifyMoviesChanged() { this._moviesChange$.next(this.copyMovies(this.movies)) }


    private schedules: Schedule[] = []
    private _schedulesChange$ = new Subject<Schedule[]>()
    public schedulesChange = this._schedulesChange$.asObservable()
    private copySchedules(schedules: Schedule[]): Schedule[] {
        let schedulesCp: Schedule[] = []
        for (let s of schedules) schedulesCp.push(copySchedule(s))
        return schedulesCp
    }
    private notifySchedulesChange() { this._schedulesChange$.next(this.copySchedules(this.schedules)) }

    private localUser?: Login
    private _localUserChange$ = new Subject<Login | null>()
    public readonly localUserChange = this._localUserChange$.asObservable()
    private notifyUserChange() {
        if (!this.localUser) this._localUserChange$.next(null)
        else this._localUserChange$.next({ ...this.localUser } as Login)
    }

    public getLocalUser(): Login | null {
        if (this.localUser) return { ...this.localUser }
        else return null
    }

    private tickets: Ticket[] = []
    private changes: LocalChanges = {
        halls: [], movies: [], schedules: [],
        deleteHalls: [], deleteMovies: [], deleteSchedules: [],
        newHallCounter: -1, newMovieCounter: -1
    } as LocalChanges
    private changed: boolean = false
    private _change$ = new Subject<boolean>()
    public readonly change = this._change$.asObservable()

    public getChanged() { return this.changed }
    private notifyDbChanged(b: boolean) {
        this.changed = b
        this._change$.next(this.changed)
    }

    private hallMap?: Map<number, CinemaHall>
    private movieMap?: Map<number, Movie>

    private minutesOffset: number = 15

    constructor() {
        console.log("database constructor")
        this.loadPublicData()
    }

    login(username: string, password: string) {
        this.loginIntoServer(username, password)
    }

    logout() {
        if (!this.localUser || !this.localUser.token || this.localUser.token === "") return
        this.localUser = undefined
        this.notifyUserChange()
    }

    private async loginIntoServer(username: string, password: string) {
        if (this.localUser) return
        console.log("executing login querry...")

        await fetch(
            LocalDatabase.serverUrl + "login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response) => {
            response.json().then(data => {
                let type: UserType = data.usertype == "ADMIN" ? UserType.ADMIN : UserType.USER
                this.localUser = { username: username, type: type, token: data.token } as Login
                this.notifyUserChange()
            })

        }).catch(() => console.log("error"))
    }

    public async updateServer() {
        console.log("start update method")
        if (!this.localUser) return
        if (this.changes.halls.length == 0 &&
            this.changes.movies.length == 0 &&
            this.changes.schedules.length == 0 &&
            this.changes.deleteHalls.length == 0 &&
            this.changes.deleteMovies.length == 0 &&
            this.changes.deleteSchedules.length == 0
        ) {
            console.log("nothing to update")
            return
        }
        console.log("updating Server...")
        await fetch(
            LocalDatabase.serverUrl + "update-database", {
            method: "post",
            headers: {
                "Authorization": this.localUser!.token,
                "changes": JSON.stringify(this.changes)
            }
        }).then((response) => {
            console.log("query returned status 200")
            this.changes = {
                halls: [], movies: [], schedules: [],
                deleteHalls: [], deleteMovies: [], deleteSchedules: [],
                newHallCounter: -1, newMovieCounter: -1
            } as LocalChanges
            this.notifyDbChanged(false)

        }).catch(() => console.log("update error"))
        this.loadPublicData()
    }

    // private async logoutFromServer() {
    //     if (!this.localUser || !this.localUser.token || this.localUser.token === "") return
    //     await fetch(
    //         "http://127.0.0.1:3000/logout", {
    //         method: "post",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             username: this.localUser.username,
    //             token: this.localUser.token
    //         })
    //     }).then((response) => {
    //         console.log("logout success")

    //     }).catch(() => console.log("error"))
    // }

    public async loadHallState(schedule: Schedule, deliver: (hall: CinemaHall | null) => void) {
        console.log("fetching hall state ...")
        await fetch(
            LocalDatabase.serverUrl + "hall-state", {
            method: "post",
            headers: {
                "Authorization": this.localUser!.token,
                "schedule": JSON.stringify(schedule)
            }
        }).then((response) => {
            response.json().then(data => {
                console.log(data)
                deliver(data)
            })
        }).catch(e => {
            console.log("can't get hall state")
            deliver(null)
        })
    }



    public async putTickets(tickets: Ticket[], respond: (successfull: boolean) => void) {
        await fetch(
            LocalDatabase.serverUrl + "buy-tickets", {
            method: "post",
            headers: {
                "Authorization": this.localUser!.token,
                "tickets": JSON.stringify(tickets)
            }
        }).then((response) => {
            console.log(response.status)
            if (response.status == 200) respond(true)
            else respond(false)

        }).catch(e => {
            console.log("error buying tickets")
            respond(false)
        })
    }



    public async loadTickets(deliver: (tickets: Ticket[] | null) => void) {
        if (!this.localUser) deliver(null)
        await fetch(LocalDatabase.serverUrl + "tickets", {
            method: "GET",
            headers: {
                "Authorization": this.localUser!.token,
            }
        }).then((response) => {
            response.json().then(data => {
                deliver(data)
            })
        }).catch(e => {
            console.log(e)
            deliver(null)
        })
    }


    public async postRating(myRating: Rating | undefined, respond: (flag: boolean) => void) {
        if (!this.localUser) respond(false)
        await fetch(LocalDatabase.serverUrl + "tickets", {
            method: "post",
            headers: {
                "Authorization": this.localUser!.token,
                "rating" : JSON.stringify(myRating)
            }
        }).then((response) => {
            if (response.status == 200) respond(true)
            else respond(false)
        }).catch(e => {
            console.log(e)
            respond(false)
        })
    }

    private async loadPublicData() {
        console.log("loading...")
        await fetch(LocalDatabase.serverUrl + "load-public-data", {
            method: "GET"
        }).then(response => {
            response.json().then(data => {
                this.halls = data.halls
                this.movies = data.movies
                this.schedules = data.schedules
                this.notifyHallsChange()
                this.notifyMoviesChanged()
                this.notifySchedulesChange()
            })
        })
        this.createMaps()
    }


    public getHallById(hallId: number): CinemaHall | null {

        for (let hall of this.halls) if (hall.hallId === hallId) return copyCinemaHall(hall)
        return null;
    }

    public getHalls(): CinemaHall[] {
        return this.copyHalls(this.halls)
    }

    public getMovieById(movieId: number): Movie | null {

        for (let movie of this.movies) if (movie.movieId === movieId) return copyMovie(movie)
        return null
    }

    public getMovies(): Movie[] {
        return this.copyMovies(this.movies)
    }

    public getSchedulesOfHall(hallId: number): Schedule[] {
        let hallSchedules: Schedule[] = []
        for (let schedule of this.schedules) if (schedule.hallId === hallId) hallSchedules.push(schedule)
        return hallSchedules
    }

    public getSchedulesOfMovie(movieId: number): Schedule[] {
        let movieSchedules: Schedule[] = []
        for (let schedule of this.schedules) if (schedule.movieId === movieId) movieSchedules.push(schedule)
        return this.copySchedules(movieSchedules)
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
        // this.loadPublicData()
        if (hall.hallId == 0) hall.hallId = this.changes.newHallCounter--
        this.findAndReplaceElseAddHall(hall)
        this.createHallMap()
        this.notifyHallsChange()
    }


    public deleteHall(hall: CinemaHall): OperationFeedback {
        // this.loadPublicData()
        for (let schedule of this.schedules) if (schedule.hallId == hall.hallId) {
            console.log(schedule)
            return OperationFeedback.HAS_REFERING_OBJECTS
        }
        for (let ticket of this.tickets) if (ticket.schedule.hallId == hall.hallId) return OperationFeedback.HAS_REFERING_OBJECTS

        this.findAndRemoveHall(hall)
        if (hall.hallId > 0) {
            this.changes.deleteHalls.push(hall)
            this.notifyDbChanged(true)
        }

        this.notifyHallsChange()
        return OperationFeedback.OK
    }


    public putMovie(movie: Movie) {
        /*
         * is created                       => put it in movies and add to changes.movies
         * is edited and new                => exchange it in movies and exchange changes.movies
         * is edited first and exists       => exchange it in movies and add add to changes.movies
         * is edited further and exists     => exchange it in movies and exchagne in change.movie
         */
        if (movie.movieId == 0) movie.movieId = this.changes.newMovieCounter--
        this.createMaps()
        this.findAndReplaceElseAddMovie(movie)
        this.notifyMoviesChanged()
    }

    public deleteMovie(movie: Movie) {
        /*
         * 1. check for refering objects
         * 2.:
         *    is new                  => delete from movies and change.movies
         *    exists and unchanged    => remove from movies and change.movies
         *    exists and changed      => remove from movies and change.movies and add to change.deleteMovies
         */

        // this.loadPublicData()
        for (let schedule of this.schedules) if (schedule.movieId == movie.movieId) {
            console.log(schedule)
            return OperationFeedback.HAS_REFERING_OBJECTS
        }
        for (let ticket of this.tickets) if (ticket.schedule.movieId == movie.movieId) return OperationFeedback.HAS_REFERING_OBJECTS

        this.findAndRemoveMovie(movie)
        if (movie.movieId > 0) {
            this.changes.deleteMovies.push(movie)
            this.notifyDbChanged(true)
        }

        this.notifyMoviesChanged()
        return OperationFeedback.OK

    }


    /**
     * Puts the schedule in the local Database if no conflicts detected
     * @param schedule Schedule to be added
     * @returns null on Succes, a copy of the conflicting Schedule on error
     */
    public putSchedule(schedule: Schedule): Schedule | null {
        this.createMaps()
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
                return copySchedule(exisitingSchedule)
            }
        }
        this.schedules.push(schedule)
        this.changes.schedules.push(schedule)
        this.notifyDbChanged(true)
        this.notifySchedulesChange()
        return null
    }


    public deleteSchedule(schedule: Schedule) {
        for (let s of this.schedules) if (compareSchedules(schedule, s)) {
            this.schedules.splice(this.schedules.indexOf(s, 0), 1)

            let foundInChanges = false
            for (let ns of this.changes.schedules) if (compareSchedules(ns, schedule)) {
                foundInChanges = true
                this.changes.schedules.splice(this.changes.schedules.indexOf(ns), 1)
                this.notifySchedulesChange()
                break
            }
            if (!foundInChanges) {
                this.changes.deleteSchedules.push(schedule)
                this.notifyDbChanged(true)
                this.notifySchedulesChange()
            }
            return
        }
    }

    private createMovieMap() {
        this.movieMap = new Map
        for (let movie of this.movies) this.movieMap.set(movie.movieId, movie)
    }

    private createHallMap() {
        this.hallMap = new Map
        for (let hall of this.halls) this.hallMap.set(hall.hallId, hall)
    }


    private createMaps() {
        this.createHallMap()
        this.createMovieMap()
    }

    private findAndReplaceElseAddHall(hall: CinemaHall) {
        this.findAndRemoveHall(hall)
        this.changes.halls.push(hall)
        this.notifyDbChanged(true)
        this.halls.push(hall)
    }

    private findAndRemoveHall(hall: CinemaHall) {
        for (let h of this.halls) if (h.hallId == hall.hallId) {
            this.changes.halls.splice(this.changes.halls.indexOf(h), 1)
        }
        for (let m of this.halls) if (m.hallId == hall.hallId) {
            this.halls.splice(this.halls.indexOf(m), 1)
        }
    }

    private findAndReplaceElseAddMovie(movie: Movie) {
        this.findAndRemoveMovie(movie)
        this.changes.movies.push(movie)
        this.notifyDbChanged(true)
        this.movies.push(movie)
    }

    private findAndRemoveMovie(movie: Movie) {
        for (let m of this.movies) if (m.movieId == movie.movieId) {
            this.changes.movies.splice(this.changes.movies.indexOf(m), 1)
        }
        for (let m of this.movies) if (m.movieId == movie.movieId) {
            this.movies.splice(this.movies.indexOf(m), 1)
        }
    }
}