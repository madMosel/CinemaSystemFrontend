import { Component } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import mockCinemas from '../../assets/mockCinemas.json';
import { Seat, SeatCategory } from '../model/seatInterface';
@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.css'],
})
export class HallListComponent {
  cinemaHalls: CinemaHall[] = mockCinemas as CinemaHall[]
  activeHall: CinemaHall = dummyCinemaHall
  hallSelected: boolean = false

  constructor(
  ) {
    console.log(this.cinemaHalls)
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
