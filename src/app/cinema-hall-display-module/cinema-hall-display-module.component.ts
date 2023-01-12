import { Component } from '@angular/core';
import { Seat,SeatCategory } from '../model/seatInterface';



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

  seats : Seat[][] = []

  constructor() {
    for(let x = 0, counter = 0; x < this.rows; x++) {
      let row : Seat[] = []
      for (let y = 0; y < this.cols; y++, counter++) {
        row.push(new Seat(this.hallId, counter, SeatCategory.Normal));
      }
      this.seats.push(row)
    }
  }
}

