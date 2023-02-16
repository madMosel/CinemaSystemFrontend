import { Component } from '@angular/core';
import { CinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase } from '../model/localDatabase';
import { Movie } from '../model/movieInterface';
import { compareNiceDatesOnTime, niceDateToString } from '../model/niceDateInterface';
import { compareSchedules, Schedule } from '../model/scheduleInterface';
import { CellEntry, TableRow, TableRowState } from '../table/tabelDataInterface';

@Component({
  selector: 'app-movie-schedule',
  templateUrl: './movie-schedule.component.html',
  styleUrls: ['./movie-schedule.component.css'],
})

export class MovieScheduleComponent {
  hall?: CinemaHall = undefined
  movie?: Movie = undefined

  halls: CinemaHall[] = []
  hallsObserver = { next: (halls: CinemaHall[]) => { this.halls = halls } }
  movies: Movie[] = []
  movieObserver = { next: (movies: Movie[]) => { this.movies = movies } }
  schedules: Schedule[] = []
  schedulesObserver = {
    next: (schedules: Schedule[]) => {
      this.schedules = schedules
      this.sortSchedulesByHallTime()
      this.updateScheduleList()
    }
  }

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
    private readonly localDatabase: LocalDatabase
  ) {
    this.halls = this.localDatabase.getHalls()
    localDatabase.hallsChange.subscribe(this.hallsObserver)
    this.movies = this.localDatabase.getMovies()
    localDatabase.moviesChange.subscribe(this.movieObserver)
    this.schedules = this.localDatabase.getSchedules()
    localDatabase.schedulesChange.subscribe(this.schedulesObserver)
    this.updateScheduleList()
  }


  pickHall(hall: CinemaHall) {
    this.unmarkSchedule()
    this.schedulingBlocked = false
    this.conflictMsg = false

    if (this.hall && this.hall.hallId == hall.hallId) {
      this.hall = undefined
      this.scheduling = false
    }
    else this.hall = hall
    if (this.movie) this.scheduling = true
    this.updateScheduleList()
  }

  isSelectedHall(hall: CinemaHall): boolean {
    return hall.hallId == this.hall?.hallId
  }

  pickMovie(movie: Movie) {
    this.unmarkSchedule()
    this.schedulingBlocked = false
    this.conflictMsg = false

    if (this.movie && this.movie.movieId == movie.movieId) {
      this.movie = undefined
      this.scheduling = false
    }
    else {
      this.movie = movie
      if (this.hall) this.scheduling = true
    }
    this.highlightRows()
  }

  isSelectedMovie(movie: Movie): boolean {
    return movie.movieId == this.movie?.movieId
  }

  unmarkSchedule() {
    if (this.markedSchedule) {
      this.markedSchedule.classRow = TableRowState.NORMAL
      this.markedSchedule = undefined
      this.highlightRows()
    }
  }

  markSchedule = (row: TableRow) => {
    this.conflictMsg = false
    if (this.markedSchedule && this.markedSchedule == row) {
      this.unmarkSchedule()
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
    this.hallMap = new Map()
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

    if (conflict !== null) {
      this.conflictMark = conflict
      this.updateScheduleList()
      this.conflictMsg = true
      for (let schedule of this.scheduleTable) if (compareSchedules(schedule.identifier, this.conflictMark)) schedule.classRow = TableRowState.CONFLICT
    }
  }

  deleteSchedule() {
    this.localDatabase.deleteSchedule(this.markedSchedule?.identifier)
    this.markedSchedule = undefined
    this.schedulingBlocked = false
  }
}
