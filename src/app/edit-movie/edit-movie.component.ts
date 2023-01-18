import { Component } from '@angular/core';
import { dummyMovie, Movie } from '../model/movieInterface';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent {
  movie : Movie = dummyMovie
}
