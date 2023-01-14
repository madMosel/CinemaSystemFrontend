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
    let seats : Seat[][] = []
    for (let numRow = 0, counter = 0; numRow < this.numRows; numRow++) {
      let row: Seat[] = []
      for (let numCol = 0; numCol < this.numCols; numCol++, counter++) {
        if (numRow < this.cinemaHall.seats.length && numCol < this.cinemaHall.seats[0].length) {
          console.log("pushing old seat")
          row.push(this.cinemaHall.seats[numRow][numCol])
        }
        else {
          console.log("pushing new seat")
          row.push(new Seat(this.hallId, counter, SeatCategory.Normal, false));
        }
      }
      seats.push(row)
    }

    this.cinemaHall = new CinemaHall(this.hallId, this.hallName, seats, false, false, false)
  }

  seatClickedCallback = (seat: Seat) => {
    console.log("seatClicked() ivoked toolActive=" +this.toolActive + " toolType=" + this.toolType)
    if (this.toolActive && this.toolType !== seat.category) {
      seat.category = this.toolType
      console.log("setting category to " + seat.category)
      this.updateHallModel()
    }
  }

  getToolActive() : boolean {
    return this.toolActive
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
