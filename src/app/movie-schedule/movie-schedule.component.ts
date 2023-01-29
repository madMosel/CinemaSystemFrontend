import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase } from '../model/localDatabase';
import { Movie } from '../model/movieInterface';
import { compareNiceDatesOnTime, NiceDate, niceDateToString } from '../model/niceDateInterface';
import { compareSchedules, Schedule, ScheduleEntry } from '../model/scheduleInterface';

@Component({
  selector: 'app-movie-schedule',
  templateUrl: './movie-schedule.component.html',
  styleUrls: ['./movie-schedule.component.css'],
})

export class MovieScheduleComponent implements OnChanges {
  localDatabase: LocalDatabase
  @Input() hall?: CinemaHall
  @Input() movie?: Movie

  activeHallButton?: HTMLButtonElement
  activeMovieButton?: HTMLButtonElement

  halls: CinemaHall[] = []
  movies: Movie[] = []
  schedules: Schedule[] = []

  hallMap?: Map<number, string>
  movieMap?: Map<number, Movie>
  scheduleEntries: ScheduleEntry[] = []
  readyForSchedule: boolean = false
  scheduleEntryToDelete?: ScheduleEntry
  oldClassSting?: string

  dateString: string = "2020-12-01"
  timeString: string = "21:00"
  conflictMark?: Schedule;
  conflictMsg: boolean = false


  constructor(
    localDatabase: LocalDatabase
  ) {
    this.localDatabase = localDatabase
    this.load()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateScheduleList()
  }

  load() {
    this.halls = this.localDatabase.getHalls()
    this.movies = this.localDatabase.getMovies()
    this.schedules = this.localDatabase.getSchedules()
    this.updateScheduleList()
  }


  pickHall(hall: CinemaHall, event: Event) {
    if (this.activeHallButton) {
      this.activeHallButton.className = "btn-hall"
    }

    let button = event.target as HTMLButtonElement
    if (this.hall && this.hall.hallId == hall.hallId) {
      button.className = "btn-hall"
      this.hall = undefined
      this.activeHallButton = undefined
    } else {
      this.hall = hall
      button.className = "btn-hall-active"
      this.activeHallButton = button
    }

    this.updateScheduleList()
  }

  pickMovie(movie: Movie, event: Event) {
    if (this.scheduleEntryToDelete) {
      this.readyForSchedule = true
      this.scheduleEntryToDelete.classString = this.oldClassSting!
      this.scheduleEntryToDelete = undefined
      return
    }
    if (this.activeMovieButton) {
      this.activeMovieButton.className = "btn-movie"
    }

    let button = event.target as HTMLButtonElement
    if (this.movie && this.movie.movieId == movie.movieId) {
      this.movie = undefined
      button.className = "btn-movie"
    }
    else {
      this.movie = movie
      button.className = "btn-movie-active"
      this.activeMovieButton = button
    }

    this.updateScheduleList()
  }


  markSchedule(scheduleEntry: ScheduleEntry) {
    this.readyForSchedule = false

    if (this.scheduleEntryToDelete) {
      this.scheduleEntryToDelete.classString = this.oldClassSting!
    }
    this.scheduleEntryToDelete = scheduleEntry
    this.oldClassSting = scheduleEntry.classString
    this.scheduleEntryToDelete.classString = "scheduleEntry-delitationMark"

  }


  updateScheduleList() {
    this.updateMaps()
    this.conflictMsg = false

    let displaySchedules: Schedule[] = this.schedules
    if (this.hall) displaySchedules = this.localDatabase.filterSchedulesByHallId(displaySchedules, this.hall.hallId)
    this.sortSchedulesByHallTime(displaySchedules)

    this.scheduleEntries = []
    let index = 0
    for (let schedule of displaySchedules) {
      let movie: Movie = this.movieMap!.get(schedule.movieId)!

      let classString = "scheduleEntry"
      if (this.movie && this.movie.movieId != schedule.movieId) classString = "scheduleEntry-lessened"
      else if (this.conflictMark && compareSchedules(this.conflictMark, schedule)) {
        classString = "scheduleEntry-conflict"
        this.conflictMark = undefined
        this.conflictMsg = true
      }


      this.scheduleEntries.push(
        {
          hallString: this.hallMap!.get(schedule.hallId),
          titleString: movie.movieTitle,
          durationString: String(movie.duration),
          classString: classString,
          dateString: niceDateToString(schedule.dateTime),
          index: index
        } as ScheduleEntry
      )
      index++
    }

    if (this.movie && this.hall) this.readyForSchedule = true
    else this.readyForSchedule = false
  }

  updateMaps() {
    this.hallMap = new Map
    this.movieMap = new Map

    for (let hall of this.halls) this.hallMap.set(hall.hallId, hall.hallName)
    for (let movie of this.movies) this.movieMap.set(movie.movieId, movie)
  }


  sortSchedulesByHallTime(schedules: Schedule[]) {
    schedules.sort((a, b) => {
      if (a.hallId != b.hallId) return a.hallId - b.hallId
      else return compareNiceDatesOnTime(a.dateTime, b.dateTime)
    })
  }

  dateSelected(event: Event) {
    this.dateString = (event.target as HTMLInputElement).value
  }

  timeSelected(event: Event) {
    this.timeString = (event.target as HTMLInputElement).value
  }


  schedule() {
    let dateTime = {
      year :  parseInt(this.dateString.substring(0, 4)),
      month : parseInt(this.dateString.substring(5, 7)),
      day : parseInt(this.dateString.substring(8, 10)),
      hour : parseInt(this.timeString.substring(0, 2)),
      minute : parseInt(this.timeString.substring(3, 5))
    }
    
    let schedule: Schedule = {} as Schedule
    schedule.hallId = this.hall!.hallId
    schedule.movieId = this.movie!.movieId
    schedule.dateTime = dateTime
    // console.log("submitSchedule")
    // console.log(schedule)
    // console.log(dateTime.getDay() + "." + dateTime.getMonth() + "." + dateTime.getFullYear() + " " + dateTime.getHours() + ":" + dateTime.getMinutes())
    let conflict = this.localDatabase.putSchedule(schedule)
    if (conflict === null) {
      this.load()
    } else {
      this.conflictMark = conflict
      this.updateScheduleList()
    }
  }

  deleteSchedule() {
    console.log(this.schedules[this.scheduleEntryToDelete!.index])
    this.localDatabase.deleteSchedule(this.schedules[this.scheduleEntryToDelete!.index])
    this.load()
  }
}
