import { Component } from '@angular/core';
import { dummyMovie, Movie } from '../model/movieInterface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies : Movie[] = []
  movieSelected : boolean = false
  activeMovie : Movie = dummyMovie

  editMovie (movie : Movie) {
     this.activeMovie = movie
     this.movieSelected = true
  }
}
