import { Component, Input } from '@angular/core';
import { LocalDatabase } from '../model/localDatabase';
import { dummyMovie, Movie } from '../model/movieInterface';
import { Rating } from '../model/ratingInterface';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent {

  // localDatabase: LocalDatabase
  @Input() movie: Movie = dummyMovie
  @Input() onCreate: () => void = () => { }
  @Input() onUpdateDatabase: () => void = () => { }

  title: string = dummyMovie.movieTitle
  age: number = dummyMovie.age
  duration: number = dummyMovie.duration
  rating: number = -1
  rateCount: number = 0
  ratings: Rating[] = dummyMovie.ratings
  description: string = dummyMovie.description

  constructor(
    public localDatabase: LocalDatabase
  ) {
    // this.localDatabase = localDatabase
    this.updateMovieModel()
  }

  updateTitle(event: any) {
    let eventVal = event.target.value
    if (eventVal != undefined && eventVal != "") {
      this.title = eventVal
      this.updateMovieModel()
    }
  }

  updateAge(event: any) {
    let eventVal = Number(event.target.value)
    if (eventVal > 0) {
      this.age = eventVal
      this.updateMovieModel()
    }
  }

  updateDuration(event: any) {
    let eventVal = Number(event.target.value)
    if (eventVal > 0) {
      this.duration = eventVal
      this.updateMovieModel()
    }
  }

  updateDescription(event: any) {
    let eventVal = event.target.value
    if (eventVal != undefined && eventVal != "") {
      this.description = eventVal
      this.updateMovieModel()
    }
  }

  updateMovieModel() {
    this.movie = {
      movieId: this.movie.movieId,
      movieTitle: this.title,
      age: this.age,
      duration: this.duration,
      poster: this.movie.poster,
      description: this.description,
      ratings: this.movie.ratings,
      price: this.movie.price
    } as Movie
  }

  updateDatabase() {
    this.localDatabase.putMovie(this.movie)
    this.onCreate()
    this.onUpdateDatabase()
  }

  getUpdateButtonText(): string {
    return this.movie.movieId > 0 ? "update local" : "create local"
  }
}
