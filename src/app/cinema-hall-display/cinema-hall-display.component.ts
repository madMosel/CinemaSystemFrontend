import { Component, Input,} from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';



@Component({
  selector: 'app-cinema-hall-display',
  templateUrl: './cinema-hall-display.component.html',
  styleUrls: ['./cinema-hall-display.component.css']
})
export class CinemaHallDisplayComponent {
  @Input() cinemaHall: CinemaHall

  constructor( ) {
    this.cinemaHall = dummyCinemaHall
  }

  public getCinemaHall(): CinemaHall {
    return this.cinemaHall
  }
}

