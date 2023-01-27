import { Time } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase } from '../model/localDatabase';
import { Movie } from '../model/movieInterface';
import { Schedule } from '../model/scheduleInterface';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css'],
  providers: [LocalDatabase],
})

export class AddScheduleComponent implements OnChanges {
  localDatabase: LocalDatabase
  navigation = "arrows"

  @Input() movie?: Movie
  movies?: Movie[]
  @Input() hall?: CinemaHall
  halls?: CinemaHall[]
  @Input() infoDisplay: string = ""

  @Input() cancelCallback = () => { }
  @Input() passScheduleCallback = (schedule: Schedule) => { }

  options: string[] = []

  selectedOption: number = 0
  dateString: string = "2020-12-01"
  timeString: string = "21:00"
  date: Date = new Date(1000)


  constructor(
    localDatabase: LocalDatabase
  ) {
    this.localDatabase = localDatabase
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.options = []
    if (this.movie) {
      this.halls = this.localDatabase.getHalls()
      for (let hall of this.halls) this.options.push(hall.hallName)
    }
    else if (this.hall) {
      this.movies = this.localDatabase.getMovies()
      for (let movie of this.movies) this.options.push(movie.movieTitle)
    }
  }


  optionSelected(event: Event) {
    this.selectedOption = (event.target as HTMLSelectElement).selectedIndex
    console.log(this.selectedOption)
  }

  dateSelected(event: Event) {
    this.dateString = (event.target as HTMLInputElement).value
  }

  timeSelected(event: Event) {
    this.timeString = (event.target as HTMLInputElement).value
  }


  generateAndPassSchedule() {

    let year = parseInt(this.dateString.substring(0, 4))
    let month = parseInt(this.dateString.substring(5, 7))
    let day = parseInt(this.dateString.substring(8, 10))

    let hour = parseInt(this.timeString.substring(0, 2))
    let minute = parseInt(this.timeString.substring(3, 5))

    let dateTime: Date = new Date
    dateTime.setFullYear(year)
    dateTime.setMonth(month-1)
    dateTime.setDate(day)
    dateTime.setHours(hour)
    dateTime.setMinutes(minute)

    let schedule: Schedule = {} as Schedule
    schedule.hallId = (this.hall ? this.hall.hallId : this.halls![this.selectedOption].hallId)
    schedule.movieId = (this.movie ? this.movie.movieId : this.movies![this.selectedOption].movieId)
    schedule.dateTime = dateTime

    this.passScheduleCallback(schedule)
  }

}
