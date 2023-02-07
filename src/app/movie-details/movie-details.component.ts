import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalDatabase } from '../model/localDatabase';
import { dummyMovie, Movie } from '../model/movieInterface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{
  // @ts-ignore
  private routeSubscription : Subscription
  movie : Movie = dummyMovie

  constructor (
    private route : ActivatedRoute,
    private readonly database: LocalDatabase
  ) {

  }
  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) : void => {
      let movieId : number = parseInt(params['id'])
      let movie = this.database.getMovieById(movieId)
      if (movie != null) this.movie = movie
    })
  }
}
