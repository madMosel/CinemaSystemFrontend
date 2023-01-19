import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { dummyMovie, Movie, } from '../model/movieInterface';
import { Stars, Rating } from '../model/ratingInterface';


@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnChanges {
  @Input() movie: Movie = dummyMovie
  rating: number = -1;
  rateCount: number = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.calculateRating()
  }

  calculateRating() {
    let rating_sum:number = 0
    this.rateCount = 0
    for(let rating of this.movie.ratings) {
      rating_sum += rating.stars.valueOf()
      this.rateCount++
    }
    this.rating = rating_sum / this.rateCount
  }
}
