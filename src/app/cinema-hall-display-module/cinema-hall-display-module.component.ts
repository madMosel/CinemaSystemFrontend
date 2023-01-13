import { Component, Input } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { Seat, SeatCategory } from '../model/seatInterface';



@Component({
  selector: 'app-cinema-hall-display-module',
  templateUrl: './cinema-hall-display-module.component.html',
  styleUrls: ['./cinema-hall-display-module.component.css']
})
export class CinemaHallDisplayModuleComponent {
  // add flags or enum of states
  // is loaded, stored in db
  // is a new cinemaHall

  hallId = -1
  hallName = "default hall name"

  rows = 10
  cols = 10

  @Input() cinemaHall: CinemaHall

  constructor() {
    this.cinemaHall = dummyCinemaHall
  }

  public getCinemaHall() : CinemaHall {
    return this.cinemaHall
  }
}

