import { Component, EventEmitter, Input, Output,} from '@angular/core';
import { EditCinemaHallComponent } from '../edit-cinema-hall/edit-cinema-hall.component';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { Seat, SeatCategory } from '../model/seatInterface';



@Component({
  selector: 'app-cinema-hall-display',
  templateUrl: './cinema-hall-display.component.html',
  styleUrls: ['./cinema-hall-display.component.css'],
})
export class CinemaHallDisplayComponent {
  @Input() cinemaHall: CinemaHall
  
  allSeatTypes = SeatCategory

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

