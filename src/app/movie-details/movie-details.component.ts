import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalDatabase } from '../model/localDatabase';
import { Login } from '../model/loginInteface';
import { dummyMovie, Movie } from '../model/movieInterface';
import { niceDateToString } from '../model/niceDateInterface';
import { mapNumberOnStars, Rating, Stars } from '../model/ratingInterface';
import { Schedule } from '../model/scheduleInterface';
import { CellEntry, TableRow, TableRowState } from '../table/tabelDataInterface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  // @ts-ignore
  private routeSubscription: Subscription
  movie: Movie = dummyMovie
  schedules: Schedule[] = []
  headline: TableRow
  scheduleList: TableRow[] = []
  rating: boolean = false
  ratingComment: string = "";
  starsValue: number = 0
  myRating?: Rating


  selectedSchedule?: TableRow

  localUser?: Login
  localUserObserver = {
    next: (loginData: Login | null) => {
      if (loginData === null) this.localUser = undefined
      else this.localUser = loginData as Login
    }
  }

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
    private readonly database: LocalDatabase
  ) {
    let headCells: CellEntry[] = [
      { value: "Hall" } as CellEntry,
      { value: "Date" } as CellEntry
    ]
    this.headline = { cells: headCells, classRow: TableRowState.HEADLINE } as TableRow
    database.localUserChange.subscribe(this.localUserObserver)
    let user = database.getLocalUser()
    if (user != null) this.localUser = user

  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params): void => {
      let movieId: number = parseInt(params['id'])
      let movie = this.database.getMovieById(movieId)
      if (movie != null) {
        this.movie = movie
        this.schedules = this.database.getSchedulesOfMovie(movieId)
        for (let schedule of this.schedules) {
          let row: TableRow = {
            classRow: TableRowState.NORMAL,
            cells: [
              { value: this.database.getHallById(schedule.hallId)!.hallName } as CellEntry,
              { value: niceDateToString(schedule.dateTime) }
            ],
            identifier: schedule,
            clickRow: this.selectMovieSchedule
          } as TableRow
          this.scheduleList.push(row)
        }
      }
    })
  }

  saveComment(event: Event) {
    this.ratingComment = ((event.target) as HTMLInputElement).value
  }

  selectMovieSchedule = (row: TableRow) => {
    if (this.selectedSchedule) {
      this.selectedSchedule.classRow = TableRowState.NORMAL
      if (this.selectedSchedule === row) {
        this.selectedSchedule = undefined
        return
      }
    }
    this.selectedSchedule = row
    row.classRow = TableRowState.HIGHLIGHTED
  }

  buyTicket() {
    this.router.navigate(["tickets-buy", JSON.stringify(this.selectedSchedule?.identifier)])
  }

  showRatingTool() {
    this.rating = true
  }

  postRating() {
    console.log(this.starsValue)
    console.log(this.ratingComment)
    if (!this.myRating && this.starsValue > 0) {
      this.myRating = {
        
      } as Rating
    }
    this.myRating!.username = this.localUser!.username
    let stars = mapNumberOnStars(this.starsValue)
    if (stars != null) this.myRating!.stars = stars
    this.myRating!.description = this.ratingComment ? this.ratingComment : undefined
    this.myRating!.movieId = this.movie.movieId

    console.log(this.myRating)
    this.database.postRating(this.myRating, (flag)=>{
      if (flag) {

      }
      else {

      }
    })
  }
}
