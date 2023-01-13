import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CinemaHallDisplayModuleComponent } from '../cinema-hall-display-module/cinema-hall-display-module.component';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { Seat, SeatCategory } from '../model/seatInterface';

@Component({
  selector: 'app-edit-cinema-hall',
  templateUrl: './edit-cinema-hall.component.html',
  styleUrls: ['./edit-cinema-hall.component.css'],
  //is needed to inflate the DisplayComponent
  providers: [CinemaHallDisplayModuleComponent]
})
export class EditCinemaHallComponent {
  hallId = -1
  hallName = "default hall name"

  rows: number = 10
  cols: number = 10
  seats: Seat[][] = []


  // add flags or enum of states
  // is loaded, stored in db
  // is a new cinemaHall

  cinemaHall: CinemaHall = dummyCinemaHall//model


  constructor() {
    this.createHallModel()
  }

  updateRows(event: any) {
    console.log(event.target.value)
    this.rows = event.target.value
    this.createHallModel()
  }

  updateCols(event: any) {
    console.log(event.target.value)
    this.cols = event.target.value
    this.createHallModel()
  }

  createHallModel() {
    for (let x = 0, counter = 0; x < this.rows; x++) {
      let row: Seat[] = []
      for (let y = 0; y < this.cols; y++, counter++) {
        row.push(new Seat(this.hallId, counter, SeatCategory.Normal));
      }
      this.seats.push(row)
    }

    this.cinemaHall = new CinemaHall(this.hallId, this.hallName, this.seats, false, false, false)
  }
}
