import { Component } from '@angular/core';
import { dummyMovie, Movie } from '../model/movieInterface';
import mockMovies from '../../assets/mockMovies.json'

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies : Movie[] = mockMovies as Movie[]
  activeMovie : Movie = dummyMovie

  editingMovie : boolean = false
  schedulingMovie : boolean = false

  editMovie (movie : Movie) {
    this.schedulingMovie = false
     this.activeMovie = movie
     this.editingMovie = true
  }

  schedule (movie : Movie) {
    this.editingMovie = false
    this.activeMovie = movie
    this.schedulingMovie = true
  }

  createNewMovie () {
    this.activeMovie = new Movie (-1, "new Movie" ,0,0, "/assets/ft the fishing turnament .jpeg", "enter description", [], 10)
    this.schedulingMovie = false
    this.editingMovie = true
  }
}
