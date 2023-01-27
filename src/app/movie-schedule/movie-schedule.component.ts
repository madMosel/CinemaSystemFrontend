import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase } from '../model/localDatabase';
import { Movie } from '../model/movieInterface';
import { Schedule, ScheduleEntry } from '../model/scheduleInterface';

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

  infoDisplay: string = "query empty"
  colHeadline: string = "query empty"
  scheduleEntries: ScheduleEntry[] = []
  creatingSchedule: boolean = false


  constructor(
    localDatabase: LocalDatabase
  ) {
    this.localDatabase = localDatabase
    this.halls = this.localDatabase.getHalls()
    this.movies = this.localDatabase.getMovies()
    this.schedules = localDatabase.getSchedules()
    this.updateScheduleList()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateScheduleList()
  }




  pickHall(hall: CinemaHall, event: Event) {
    if (this.activeHallButton) {
      this.activeHallButton.className = "btn-hall"
      this.activeHallButton.disabled = false
    }

    this.hall = hall

    let button = event.target as HTMLButtonElement
    button.className = "btn-hall-active"
    button.disabled = true
    this.activeHallButton = button

    this.updateScheduleList()
  }

  pickMovie(movie: Movie, event: Event) {
    if (this.activeMovieButton) {
      this.activeMovieButton.className = "btn-movie"
      this.activeMovieButton.disabled = false
    }

    this.movie = movie

    let button = event.target as HTMLButtonElement
    button.className = "btn-movie-active"
    button.disabled = true
    this.activeMovieButton = button

    this.updateScheduleList()
  }


  updateScheduleList() {
    this.updateMaps()

    let displaySchedules: Schedule[] = this.schedules
    if (this.hall) displaySchedules = this.localDatabase.filterSchedulesByHallId(displaySchedules, this.hall.hallId)
    this.sortSchedulesByHallTime(displaySchedules)

    this.scheduleEntries = []
    for (let schedule of displaySchedules) {
      let movie: Movie = this.movieMap!.get(schedule.movieId)!
      let time = schedule.dateTime
      let day = String(time.getDay())
      let month = String(time.getMonth() + 1)
      let hour = String(time.getHours())
      let minute = String(time.getMinutes())
      let dateString = (day.length < 2 ? "0" : " ") + day + "." +
        (month.length < 2 ? "0" : " ") + month + "." + time.getFullYear()
        + " " + (hour.length < 2 ? "0" : " ") + hour + ":" + (minute.length < 2 ? "0" : " ") + minute
      this.scheduleEntries.push(
        {
          hallString: this.hallMap!.get(schedule.hallId),
          titleString: movie.movieTitle,
          durationString: String(movie.duration),
          classString: (this.movie && this.movie.movieId != schedule.movieId ? "scheduleEntry-lessened" : "scheduleEntry"),
          dateString: dateString
        } as ScheduleEntry
      )
    }
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

  createSchedule = () => {
    this.creatingSchedule = !this.creatingSchedule
  }

  receiveAndSubmitSchedule = (schedule: Schedule) => {
    console.log("submitSchedule")
    console.log(schedule)
    let dateTime = schedule.dateTime
    console.log(dateTime.getDay() + "." + dateTime.getMonth() + "." + dateTime.getFullYear() + " " + dateTime.getHours() + ":" + dateTime.getMinutes())
  }
}
