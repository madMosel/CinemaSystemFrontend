import { Component } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import mockCinemas from '../../assets/mockCinemas.json';
import { Seat, SeatCategory } from '../model/seatInterface';
import { LocalDatabase } from '../model/localDatabase';


@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.css'],
  providers: [LocalDatabase]
})



export class HallListComponent {

  cinemaHalls: CinemaHall[]
  activeHall: CinemaHall = dummyCinemaHall
  hallSelected: boolean = false

  constructor(
    private localDatabase : LocalDatabase
  ) {
    this.cinemaHalls = this.localDatabase.getHalls()
  }

  editCinemaHall(cinemaHall: CinemaHall) {
    this.activeHall = cinemaHall
    this.hallSelected = true
  }

  createNewHall() {
    let seat: Seat = new Seat(-1, 1, SeatCategory.Normal, false)
    let seats: Seat[][] = [[seat]]
    this.activeHall = new CinemaHall(-1, "hall name", seats, false, false, false)
    this.hallSelected = true
  }
}
