import { Component } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { dummyMovie, Movie, } from '../model/movieInterface';
import { Stars, Rating } from '../model/ratingInterface';


@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent {
  movie: Movie = dummyMovie
  rating: number = 4;
}
