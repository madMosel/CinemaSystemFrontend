import { Component, Input } from '@angular/core';
import { dummyMovie, Movie } from '../model/movieInterface';
import { Rating, Stars } from '../model/ratingInterface';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent {
  @Input() movie: Movie = dummyMovie

  title: string = dummyMovie.movieTitle
  age: number = dummyMovie.age
  duration: number = dummyMovie.duration
  rating: number = -1
  rateCount: number = 0
  ratings: Rating[] = dummyMovie.ratings
  description: string = dummyMovie.description

  constructor() {
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
    this.movie = new Movie(this.movie.movieId, this.title, this.age, this.duration, this.movie.poster, this.description, this.movie.ratings, this.movie.price)
  }

  printMovieToJson() {
    console.log(JSON.stringify(this.movie));
  }
}
