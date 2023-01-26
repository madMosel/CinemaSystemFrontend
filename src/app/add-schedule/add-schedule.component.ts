import { Component, Input } from '@angular/core';
import { CinemaHall } from '../model/cinemaHallInterface';
import { Movie } from '../model/movieInterface';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})

export class AddScheduleComponent {
  navigation = "arrows"

  @Input() movie? : Movie
  @Input() hall? : CinemaHall
  @Input() cancelCallback = () => {}

}
