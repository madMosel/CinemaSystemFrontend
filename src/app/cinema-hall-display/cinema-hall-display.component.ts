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

  @Input() parrentCallback: (seat: Seat) => void = (seat: Seat) => { }
  test: string = "CinemaHallDisplayComponent"

  constructor(
  ) {
    this.cinemaHall = dummyCinemaHall
  }


  buttonClicked(seat: Seat) {
    this.parrentCallback(seat)
  }

  getSrcString(seat: Seat) {
    if (seat.state == SeatState.FREE && seat.category == SeatCategory.NORMAL) return "/assets/normal_seat_50.png"
    if (seat.state == SeatState.FREE && seat.category == SeatCategory.HANDICAP) return "/assets/handicap_seat_50.png"
    if (seat.state == SeatState.FREE && seat.category == SeatCategory.PREMIUM) return "/assets/premium_seat_50.png"
    if (seat.state == SeatState.BOOKED && !seat.belongsToLocalUser) return "/assets/seat_booked_50.png"
    if (seat.state == SeatState.BOOKED && seat.belongsToLocalUser) return "/assets/seat_booked_by_me_50.png"
    // if (seat.state == SeatState.RESERVED && !seat.belongsToLocalUser) return "/assets/seat_booked_50.png"
    // if (seat.state == SeatState.RESERVED && seat.belongsToLocalUser && seat.category == SeatCategory.NORMAL) return "/assets/normal_seat_reserved_50.png"
    // if (seat.state == SeatState.RESERVED && seat.belongsToLocalUser && seat.category == SeatCategory.HANDICAP) return "/assets/handicap_seat_reserved_50.png"
    // if (seat.state == SeatState.RESERVED && seat.belongsToLocalUser && seat.category == SeatCategory.PREMIUM) return "/assets/premium_seat_reserved_50.png"

    if (seat.state == SeatState.RESERVED && seat.category == SeatCategory.NORMAL) return "/assets/normal_seat_reserved_50.png"
    if (seat.state == SeatState.RESERVED && seat.category == SeatCategory.HANDICAP) return "/assets/handicap_seat_reserved_50.png"
    if (seat.state == SeatState.RESERVED && seat.category == SeatCategory.PREMIUM) return "/assets/premium_seat_reserved_50.png"
    return ""
  }
}

