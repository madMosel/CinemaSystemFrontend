import { Component } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import mockCinemas from '../../assets/mockCinemas.json';
import { Router } from '@angular/router';
import { EditCinemaHallComponent } from '../edit-cinema-hall/edit-cinema-hall.component';

@Component({
  selector: 'app-hall-browser',
  templateUrl: './hall-browser.component.html',
  styleUrls: ['./hall-browser.component.css'],
  providers: [EditCinemaHallComponent]
})
export class HallBrowserComponent {
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
