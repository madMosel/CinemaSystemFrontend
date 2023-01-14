import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CinemaHallDisplayComponent } from '../cinema-hall-display/cinema-hall-display.component';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { Seat, SeatCategory } from '../model/seatInterface';

@Component({
  selector: 'app-edit-cinema-hall',
  templateUrl: './edit-cinema-hall.component.html',
  styleUrls: ['./edit-cinema-hall.component.css'],
  //is needed to inflate the DisplayComponent
  providers: [CinemaHallDisplayComponent]
})
export class EditCinemaHallComponent {
  hallId = -1
  hallName = "default hall name"

  numRows: number = 10
  numCols: number = 10
  seats: Seat[][] = []

  toolActive: boolean = false
  toolType: SeatCategory = SeatCategory.Normal
  test: string = "EditCinemaHallComponent"


  // add flags or enum of states
  // is loaded, stored in db
  // is a new cinemaHall

  cinemaHall: CinemaHall = dummyCinemaHall


  constructor(
    // public cinemaHallDisplay : CinemaHallDisplayComponent
    public readonly router: Router
  ) {
    this.updateHallModel()
  }

  updateRows(event: any) {
    this.numRows = event.target.value
    this.updateHallModel()
  }

  updateCols(event: any) {
    console.log(event.target.value)
    this.numCols = event.target.value
    this.updateHallModel()
  }

  updateHallModel() {
    this.seats = []
    for (let numRow = 0, counter = 0; numRow < this.numRows; numRow++) {
      let row: Seat[] = []
      for (let numCol = 0; numCol < this.numCols; numCol++, counter++) {
        row.push(new Seat(this.hallId, counter, SeatCategory.Normal, false));
      }
      this.seats.push(row)
    }
    this.cinemaHall = new CinemaHall(this.hallId, this.hallName, this.seats, false, false, false)
  }

  public seatClicked(seat: Seat) {
    console.log("seatClicked() ivoked test=" + this.hallId)
    if (this.toolActive && this.toolType !== seat.category) {
      seat.category = this.toolType
      console.log("setting category to " + seat.category)
      this.updateHallModel()
    }
  }

  normalClicked() {
    this.toolButtonClicked(SeatCategory.Normal)
  }

  handicapClicked() {
    this.toolButtonClicked(SeatCategory.Handicap)
  }

  premiumClicked() {
    this.toolButtonClicked(SeatCategory.Premium)
  }

  toolButtonClicked(category: SeatCategory) {
    console.log(this)
    if (this.toolActive && this.toolType === category) {
      console.log(1)
      this.toolActive = false
    }
    else if (this.toolActive && this.toolType !== category) {
      console.log(2)
      this.toolType = category
    }
    else if (!this.toolActive) {
      console.log(3)
      this.toolActive = true
      this.toolType = category
    }
  }
}
