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

  infoDisplay: string = "query empty"
  colHeadline: string = "query empty"
  scheduleEntries: ScheduleEntry[] = []
  creatingSchedule: boolean = false

  constructor(
    localDatabase: LocalDatabase
  ) {
    this.localDatabase = localDatabase
  }

  ngOnChanges(changes: SimpleChanges): void {
    let schedules: Schedule[] = []
    if (this.hall) {
      this.prepareSchedulesForHall()
    }
    else if (this.movie) {
      this.prepareSchedulesOfMovie()
    }
  }

  prepareSchedulesOfMovie(): void {
    this.infoDisplay = '"' + this.movie!.movieTitle + '"'
    this.colHeadline = "Hall Name"
    let schedules: Schedule[] = this.localDatabase.getSchedulesOfMovie(this.movie!.movieId)

    this.sortSchedulesByTime(schedules)
    this.scheduleEntries = []
    for (let schedule of schedules) {
      let entry: ScheduleEntry = {
        displayString: this.localDatabase.getHallById(schedule.hallId)!.hallName,
        date: schedule.dateTime
      } as ScheduleEntry

      this.scheduleEntries.push(entry)
    }
  }

  prepareSchedulesForHall() {
    this.infoDisplay = '"' + this.hall!.hallName + '"'
    this.colHeadline = "Title"
    let schedules: Schedule[] = this.localDatabase.getSchedulesOfHall(this.hall!.hallId)

    this.sortSchedulesByTime(schedules)
    this.scheduleEntries = []
    for (let schedule of schedules) {
      let entry: ScheduleEntry = {
        displayString: this.localDatabase.getMovieById(schedule.movieId)!.movieTitle,
        date: schedule.dateTime
      } as ScheduleEntry

      this.scheduleEntries.push(entry)
    }
  }

  sortSchedulesByTime(schedules: Schedule[]) {
    schedules.sort((a, b) => {
      return b.dateTime.getTime() - a.dateTime.getTime()
    })
  }

  createSchedule = () => {
    this.creatingSchedule = !this.creatingSchedule
  }

  receiveAndSubmitSchedule = (schedule : Schedule) => {
    console.log("submitSchedule")
    console.log(schedule)
    let dateTime = schedule.dateTime
    console.log (dateTime.getDay() + "." + dateTime.getMonth() + "." + dateTime.getFullYear() + " " + dateTime.getHours() + ":" + dateTime.getMinutes())
  }
}
