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
  scheduleEntries: ScheduleEntry[] = []

  constructor(
    localDatabase: LocalDatabase
  ) {
    this.localDatabase = localDatabase
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.prepareSchedules()
  }

  prepareSchedules(): void {
    let schedules : Schedule[] = []
    if (this.hall) {
      this.infoDisplay = "Movie Schedules for hall " + this.hall!.hallName
      schedules = this.localDatabase.getSchedulesOfHall(this.hall!.hallId)
    }
    else if (this.movie) {
      this.infoDisplay = "Movie Schedules for hall " + this.movie!.movieTitle
      schedules = this.localDatabase.getSchedulesOfMovie(this.movie!.movieId)
    }
    else return

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
}
