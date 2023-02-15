import { Component, Input } from '@angular/core';
import { checkInputString } from '../model/helpers';
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
  titleError: boolean = false;
  ageError: boolean = false;
  durationError: boolean = false;
  descriptionError: boolean = false;

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
    // if (!checkInputString(this.movie.movieTitle, 1, 70)) {
    //   this.titleError = true
    //   return
    // }
    // if (this.movie.age < 0) {
    //   this.ageError = true
    //   return
    // }
    // if (this.movie.duration < 1) {
    //   this.durationError = true
    //   return
    // }
    // if (!checkInputString(this.movie.description, 1, 400)) {
    //   this.descriptionError = true
    //   return
    // }


    this.localDatabase.putMovie(this.movie)
    this.onCreate()
    this.onUpdateDatabase()
    this.titleError = false
    this.ageError = false
    this.durationError = false
    this.descriptionError = false
  }

  getUpdateButtonText(): string {
    return this.movie.movieId > 0 ? "update local" : "create local"
  }
}
