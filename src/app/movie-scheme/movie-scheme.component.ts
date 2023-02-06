import { Component, Input } from '@angular/core';
import { LocalDatabase } from '../model/localDatabase';
import { Movie } from '../model/movieInterface';

@Component({
  selector: 'app-movie-scheme',
  templateUrl: './movie-scheme.component.html',
  styleUrls: ['./movie-scheme.component.css']
})
export class MovieSchemeComponent {
  @Input() movie? : Movie | null
  @Input() onclickCallback : (movie : Movie) => void = () => {}
}
