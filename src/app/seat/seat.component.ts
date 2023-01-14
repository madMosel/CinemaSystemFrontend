import { Component, Input } from '@angular/core';
import { dummySeat, Seat, SeatCategory } from '../model/seatInterface';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent {
  @Input() seat: Seat = dummySeat
  sourcePath: string

  constructor() {
    switch (this.seat.category) {
      case SeatCategory.Normal:
        this.sourcePath = "/assets/normal_seat_50.png"
        break
      case SeatCategory.Handicap:
        this.sourcePath = "/assets/handicap_50.png"
        break
      case SeatCategory.Premium:
        this.sourcePath = "/assets/premium_50.png"
        break
    }
  }
}
