import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalDatabase } from '../model/localDatabase';
import { dummyMovie, Movie } from '../model/movieInterface';
import { copySchedule, Schedule } from '../model/scheduleInterface';
import { CellEntry, TableRow, TableRowState } from '../table/tabelDataInterface';
import { niceDateToString } from '../model/niceDateInterface'
import { Login } from '../model/loginInteface';

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
}
