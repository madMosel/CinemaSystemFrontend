import { Component, Input,} from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';



@Component({
  selector: 'app-cinema-hall-display-module',
  templateUrl: './cinema-hall-display-module.component.html',
  styleUrls: ['./cinema-hall-display-module.component.css']
})
export class CinemaHallDisplayModuleComponent {
  @Input() cinemaHall: CinemaHall

  constructor( ) {
    this.cinemaHall = dummyCinemaHall
  }

  public getCinemaHall(): CinemaHall {
    return this.cinemaHall
  }
}

