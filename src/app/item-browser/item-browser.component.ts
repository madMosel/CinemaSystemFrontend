import { Component } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import mockCinemas from '../../assets/mockCinemas.json';
import { Router } from '@angular/router';
import { EditCinemaHallComponent } from '../edit-cinema-hall/edit-cinema-hall.component';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.css'],
  providers: [EditCinemaHallComponent]
})
export class ItemBrowserComponent {
  cinemaHalls: CinemaHall[] = mockCinemas as CinemaHall[]
  activeHall: CinemaHall = dummyCinemaHall
  hallSelected: boolean = false

  constructor(
    private readonly hallEditor: EditCinemaHallComponent,
    private readonly router: Router
  ) {
    console.log(this.cinemaHalls)
  }

  editCinemaHall(cinemaHall: CinemaHall) {
    this.activeHall = cinemaHall
    this.hallSelected = true
  }
}
