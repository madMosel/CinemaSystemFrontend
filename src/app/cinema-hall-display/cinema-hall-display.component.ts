import { Component, Input } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { Seat, SeatCategory, SeatState } from '../model/seatInterface';



@Component({
  selector: 'app-cinema-hall-display',
  templateUrl: './cinema-hall-display.component.html',
  styleUrls: ['./cinema-hall-display.component.css'],
})
export class CinemaHallDisplayComponent {
  @Input() cinemaHall: CinemaHall
  
  allSeatTypes = SeatCategory
  allSeatStates = SeatState

  @Input() parrentCallback : (seat : Seat) => void = (seat : Seat) => {}
  test: string = "CinemaHallDisplayComponent"

  constructor(
   ) {
    this.cinemaHall = dummyCinemaHall
  }


  buttonClicked(seat : Seat) {
      this.parrentCallback(seat)
  }

}

