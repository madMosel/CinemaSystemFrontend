import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CinemaHallDisplayComponent } from '../cinema-hall-display/cinema-hall-display.component';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase, OperationFeedback } from '../model/localDatabase';
import { Seat, SeatCategory, SeatState } from '../model/seatInterface';

@Component({
  selector: 'app-edit-cinema-hall',
  templateUrl: './edit-cinema-hall.component.html',
  styleUrls: ['./edit-cinema-hall.component.css'],
  //is needed to inflate the DisplayComponent
  providers: [CinemaHallDisplayComponent]
})
export class EditCinemaHallComponent implements OnChanges {


  @Input() cinemaHall: CinemaHall = dummyCinemaHall
  numRows: number
  numCols: number

  toolActive: boolean = false
  toolType: SeatCategory = SeatCategory.Normal
  @Input() onCreate : () => void = () => {}


  // add flags or enum of states
  // is loaded, stored in db
  // is a new cinemaHall



  constructor(
    public readonly router: Router,
    public localDatabase: LocalDatabase
  ) {
    console.log("constructor called")
    this.numRows = this.cinemaHall.seats.length
    this.numCols = this.cinemaHall.seats[0].length
    this.updateHallModel()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.numRows = this.cinemaHall.seats.length
    this.numCols = this.cinemaHall.seats[0].length
  }


  updateRows(event: any) {
    let eventVal = event.target.value
    if (eventVal > 0) {
      this.numRows = eventVal
      this.updateHallModel()
    }
  }

  updateCols(event: any) {
    let eventVal = event.target.value
    if (eventVal > 0) {
      this.numCols = eventVal
      this.updateHallModel()
    }
  }

  updateName(event: any) {
    let eventVal = event.target.value
    if (eventVal != undefined && eventVal != "") {
      console.log(eventVal)
      this.cinemaHall.hallName = eventVal
      this.updateHallModel()
    }
  }

  updateHallModel() {
    let seats: Seat[][] = []
    console.log(this.numRows + " " + this.numCols)

    for (let numRow = 0, counter = 0; numRow < this.numRows; numRow++) {
      let row: Seat[] = []
      for (let numCol = 0; numCol < this.numCols; numCol++, counter++) {
        if (numRow < this.cinemaHall.seats.length && numCol < this.cinemaHall.seats[0].length) {
          row.push(this.cinemaHall.seats[numRow][numCol])
        }
        else {
          row.push(new Seat(counter, SeatCategory.Normal, SeatState.FREE));
        }
      }
      seats.push(row)
    }

    this.cinemaHall = new CinemaHall(this.cinemaHall.hallId, this.cinemaHall.hallName, seats, this.cinemaHall.dolby, this.cinemaHall.d3, this.cinemaHall.d4)
  }

  seatClickedCallback = (seat: Seat) => {
    console.log("seatClicked() ivoked toolActive=" + this.toolActive + " toolType=" + this.toolType)
    if (this.toolActive && this.toolType !== seat.category) {
      seat.category = this.toolType
      console.log("setting category to " + seat.category)
      this.updateHallModel()
    }
  }

  getToolActive(): boolean {
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

  updateDatabase() {
    this.localDatabase.putHall(this.cinemaHall)
    this.onCreate()
  }

  // public setCinemaHall = (cinemaHall: CinemaHall) => {
  //   console.log("setting hall... hall=")
  //   console.log(cinemaHall)
  //   this.cinemaHall = cinemaHall
  //   this.numRows = this.cinemaHall.seats.length
  //   this.numCols = this.cinemaHall.seats[0].length
  //   this.updateHallModel()
  //   console.log(this.cinemaHall)
  // }
}
