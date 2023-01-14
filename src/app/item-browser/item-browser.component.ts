import { Component } from '@angular/core';
import { CinemaHall } from '../model/cinemaHallInterface';
import mockCinemas from '../../assets/mockCinemas.json';
import { Seat, SeatCategory } from '../model/seatInterface';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.css']
})
export class ItemBrowserComponent {
  cinemaHalls: CinemaHall[] = mockCinemas as CinemaHall[]

  constructor() {
    console.log(this.cinemaHalls)
  }
}
