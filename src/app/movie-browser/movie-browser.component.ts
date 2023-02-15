import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDatabase } from '../model/localDatabase';
import { Movie } from '../model/movieInterface';

@Component({
  selector: 'app-movie-browser',
  templateUrl: './movie-browser.component.html',
  styleUrls: ['./movie-browser.component.css']
})
export class MovieBrowserComponent {
  movies: Movie[] = []
  movieObserver = { next: (movies: Movie[]) => { this.movies = movies } }

  constructor(
    private readonly database: LocalDatabase,
    private readonly router: Router
  ) {
    database.moviesChange.subscribe(this.movieObserver)
    this.movies = database.getMovies()
  }

  goToMovie(movie: Movie) {
    this.router.navigate(["movie-details", movie.movieId])
  }
}
