enum HallBtnState {
  HIGHLIGHTED = "btn-hall-highlighted",
  NORMAL = "btn-hall"
}

enum MovieBtnState {
  HIGHLIGHTED = "btn-movie-highlighted",
  NORMAL = "btn-movie"
}

enum TableRowState {
  HIGHLIGHTED = "table-row-highlighted",
  NORMAL = "table-row",
  MARKED = "table-row-marked",
  CONFLICT = "table-row-conflict"
}


import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase } from '../model/localDatabase';
import { Movie } from '../model/movieInterface';
import { compareNiceDatesOnTime, NiceDate, niceDateToString } from '../model/niceDateInterface';
import { compareSchedules, Schedule } from '../model/scheduleInterface';
import { TableRow, CellEntry } from '../table/tabelDataInterface'

@Component({
  selector: 'app-movie-schedule',
  templateUrl: './movie-schedule.component.html',
  styleUrls: ['./movie-schedule.component.css'],
})

export class MovieScheduleComponent {



  localDatabase: LocalDatabase
  hall?: CinemaHall
  movie?: Movie

  activeHallButton?: HTMLButtonElement
  activeMovieButton?: HTMLButtonElement

  halls: CinemaHall[] = []
  movies: Movie[] = []
  schedules: Schedule[] = []

  scheduleTable: TableRow[] = []
  markedSchedule?: TableRow

  hallMap?: Map<number, string>
  movieMap?: Map<number, Movie>


  dateString: string = "2020-12-01"
  timeString: string = "21:00"

  scheduling: boolean = false
  schedulingBlocked: boolean = false
  conflictMark?: Schedule;
  conflictMsg: boolean = false


  constructor(
    localDatabase: LocalDatabase
  ) {
    console.log("constructor")
    this.localDatabase = localDatabase
    this.load()
  }


  load() {
    this.halls = this.localDatabase.getHalls()
    this.movies = this.localDatabase.getMovies()
    this.schedules = this.localDatabase.getSchedules()
    this.sortSchedulesByHallTime()
    this.updateScheduleList()
    this.movie = undefined
    this.hall = undefined
  }


  pickHall(hall: CinemaHall, event: Event) {
    this.schedulingBlocked = false
    this.conflictMsg  = false
    if (this.activeHallButton) this.activeHallButton.className = HallBtnState.NORMAL
    let button = event.target as HTMLButtonElement


    if (this.hall && this.hall.hallId == hall.hallId) {
      button.className = HallBtnState.NORMAL
      this.hall = undefined
      this.activeHallButton = undefined
      this.scheduling = false
    } else {
      this.hall = hall
      button.className = HallBtnState.HIGHLIGHTED
      this.activeHallButton = button
      if (this.movie) this.scheduling = true
    }

    this.updateScheduleList()
  }

  pickMovie(movie: Movie, event: Event) {
    this.schedulingBlocked = false
    this.conflictMsg  = false
    if (this.activeMovieButton) this.activeMovieButton.className = MovieBtnState.NORMAL

    let button = event.target as HTMLButtonElement
    if (this.movie && this.movie.movieId == movie.movieId) {
      this.movie = undefined
      button.className = MovieBtnState.NORMAL
    }
    else {
      this.movie = movie
      button.className = MovieBtnState.HIGHLIGHTED
      this.activeMovieButton = button
      if (this.hall) this.scheduling = true
    }
    this.highlightRows()
  }


  markSchedule = (row: TableRow) => {
    this.conflictMsg = false
    if (this.markedSchedule && this.markedSchedule == row) {
      this.markedSchedule.classRow = TableRowState.NORMAL
      this.markedSchedule = undefined
      this.highlightRows()
      this.schedulingBlocked = false
    }
    else {
      this.highlightRows()
      this.markedSchedule = row
      this.markedSchedule.classRow = TableRowState.MARKED
      this.schedulingBlocked = true
    }
  }

  highlightRows() {
    for (let schedule of this.scheduleTable) {
      if (this.movie && (schedule.identifier as Schedule).movieId == this.movie!.movieId) schedule.classRow = TableRowState.HIGHLIGHTED
      else schedule.classRow = TableRowState.NORMAL
    }
  }


  updateScheduleList() {
    this.updateMaps()
    this.conflictMsg = false


    this.scheduleTable = []
    for (let schedule of this.schedules) {
      if (this.hall && this.hall.hallId != schedule.hallId) continue

      let movie: Movie = this.movieMap!.get(schedule.movieId)!
      let hallName = { value: this.hallMap!.get(schedule.hallId)! } as CellEntry
      let title = { value: movie.movieTitle } as CellEntry
      let duration = { value: String(movie.duration) + " min" } as CellEntry
      let date = { value: niceDateToString(schedule.dateTime) } as CellEntry

      this.scheduleTable.push({
        identifier: schedule, classRow: TableRowState.NORMAL, clickRow: this.markSchedule, cells: [hallName, title, date, duration]
      } as TableRow)
    }
    this.highlightRows()
  }

  updateMaps() {
    this.hallMap = new Map
    for (let hall of this.halls) this.hallMap.set(hall.hallId, hall.hallName)
    this.movieMap = new Map
    for (let movie of this.movies) this.movieMap.set(movie.movieId, movie)
  }


  sortSchedulesByHallTime() {
    this.schedules.sort((a, b) => {
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
      year: parseInt(this.dateString.substring(0, 4)),
      month: parseInt(this.dateString.substring(5, 7)),
      day: parseInt(this.dateString.substring(8, 10)),
      hour: parseInt(this.timeString.substring(0, 2)),
      minute: parseInt(this.timeString.substring(3, 5))
    }

    let schedule: Schedule = {} as Schedule
    schedule.hallId = this.hall!.hallId
    schedule.movieId = this.movie!.movieId
    schedule.dateTime = dateTime
    let conflict = this.localDatabase.putSchedule(schedule)

    if (conflict === null) this.load()
    else {
      this.conflictMark = conflict
      this.updateScheduleList()
      this.conflictMsg = true
      for (let schedule of this.scheduleTable) if (compareSchedules(schedule.identifier, this.conflictMark)) schedule.classRow = TableRowState.CONFLICT
    }
  }

  deleteSchedule() {
    this.localDatabase.deleteSchedule(this.markedSchedule?.identifier)
    this.load()
    this.markedSchedule = undefined
  }
}
