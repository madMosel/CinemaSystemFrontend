import { Component } from '@angular/core';
import { dummyMovie, Movie } from '../model/movieInterface';
import mockMovies from '../../assets/mockMovies.json'
import { LocalDatabase, OperationFeedback } from '../model/localDatabase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  localDatabase: LocalDatabase

  movies: Movie[]
  activeMovie: Movie = dummyMovie

  editingMovie: boolean = false
  schedulingMovie: boolean = false
  deletationConflicts: boolean = false;

  constructor(
    localDatabase: LocalDatabase
  ) {
    this.localDatabase = localDatabase
    this.movies = this.localDatabase.getMovies()
  }

  editMovie(movie: Movie) {
    this.schedulingMovie = false
    this.deletationConflicts = false
    this.activeMovie = movie
    this.editingMovie = true
  }

  createNewMovie() {
    this.activeMovie = new Movie(-1, "new Movie", 0, 0, "/assets/ft the fishing turnament .jpeg", "enter description", [], 10)
    this.schedulingMovie = false
    this.deletationConflicts = false
    this.editingMovie = true
  }
  deleteMovie(movie: Movie) {
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
}
