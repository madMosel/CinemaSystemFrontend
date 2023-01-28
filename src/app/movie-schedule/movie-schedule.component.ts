import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase } from '../model/localDatabase';
import { Movie } from '../model/movieInterface';
import { compareSchedules, Schedule, ScheduleEntry, stringifySchedules } from '../model/scheduleInterface';

@Component({
  selector: 'app-movie-schedule',
  templateUrl: './movie-schedule.component.html',
  styleUrls: ['./movie-schedule.component.css'],
  providers: [LocalDatabase]
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
  oldClassSting? : string 

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

    console.log(this.movies)
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
      let time = schedule.dateTime
      let day = String(time.getDay()+1)
      let month = String(time.getMonth() + 1)
      let hour = String(time.getHours())
      let minute = String(time.getMinutes())
      let dateString = (day.length < 2 ? "0" : " ") + day + "." +
        (month.length < 2 ? "0" : " ") + month + "." + time.getFullYear()
        + " " + (hour.length < 2 ? "0" : " ") + hour + ":" + (minute.length < 2 ? "0" : " ") + minute



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
          dateString: dateString,
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
      else return b.dateTime.getTime() - a.dateTime.getTime()
    })
  }

  dateSelected(event: Event) {
    this.dateString = (event.target as HTMLInputElement).value
  }

  timeSelected(event: Event) {
    this.timeString = (event.target as HTMLInputElement).value
  }


  schedule() {
    let year = parseInt(this.dateString.substring(0, 4))
    let month = parseInt(this.dateString.substring(5, 7))
    let day = parseInt(this.dateString.substring(8, 10))

    let hour = parseInt(this.timeString.substring(0, 2))
    let minute = parseInt(this.timeString.substring(3, 5))

    let dateTime: Date = new Date
    dateTime.setFullYear(year)
    dateTime.setMonth(month - 1)
    dateTime.setDate(day)
    dateTime.setHours(hour)
    dateTime.setMinutes(minute)

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

  markSchedule(scheduleEntry: ScheduleEntry) {
    if (this.scheduleEntryToDelete) {
      this.scheduleEntryToDelete.classString = this.oldClassSting!
    }
    this.scheduleEntryToDelete = scheduleEntry
    this.oldClassSting = scheduleEntry.classString
    this.scheduleEntryToDelete.classString = "scheduleEntry-delitationMark"
  }

  deleteSchedule() {
    console.log(this.schedules[this.scheduleEntryToDelete!.index])
    this.localDatabase.deleteSchedule(this.schedules[this.scheduleEntryToDelete!.index])
    this.load()
  }
}
