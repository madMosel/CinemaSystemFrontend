import { Component } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import mockCinemas from '../../assets/mockCinemas.json';
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
}
