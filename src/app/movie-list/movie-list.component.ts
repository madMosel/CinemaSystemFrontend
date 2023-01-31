import { Component } from '@angular/core';
import { dummyMovie, Movie } from '../model/movieInterface';
import { LocalDatabase, OperationFeedback } from '../model/localDatabase';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent {

  movies: Movie[] = []
  activeMovie: Movie = dummyMovie

  editingMovie: boolean = false
  schedulingMovie: boolean = false
  deletationConflicts: boolean = false;

  constructor(
    private localDatabase: LocalDatabase
  ) {
    this.loadMovies()
  }

  editMovie(movie: Movie) {
    this.schedulingMovie = false
    this.deletationConflicts = false
    this.activeMovie = movie
    this.editingMovie = true
  }

  createNewMovie() {
    this.activeMovie = new Movie(0, "new Movie", 0, 0, "/assets/ft the fishing turnament .jpeg", "enter description", [], 10)
    this.schedulingMovie = false
    this.deletationConflicts = false
    this.editingMovie = true
  }
  deleteMovie(movie: Movie) {
    this.deletationConflicts = false
    console.log("deleting " + movie.movieId + " " + movie.movieTitle + "...")
    let feedback: OperationFeedback = this.localDatabase.deleteMovie(movie)
    switch (feedback) {
      case OperationFeedback.HAS_REFERING_OBJECTS:
        this.deletationConflicts = true
        break
      case OperationFeedback.OK:
        this.movies = this.localDatabase.getMovies()
        break
    }
    console.log(feedback)
  }

  loadMovies = () => {
    this.movies = this.localDatabase.getMovies()
  }
}
