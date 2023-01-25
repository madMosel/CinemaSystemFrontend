import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CinemaSystemFrontend';

  constructor(private readonly router: Router) {
    this.router.navigate(["movie-browser"]);
  }

  navigateToCinemaHallModule() {
    this.router.navigate(["cinema-hall-display-module"])
  }

  goToStart() {
    this.router.navigate(["movie-browser"]);
  }

  navigateToEditCinemaHall() {
    this.router.navigate(["edit-cinema-hall"])
  }

  navigateToManagmentView() {
    this.router.navigate(["managment-view"])
  }

  navigateToMovieDisplay() {
    this.router.navigate(["movie-display"])
  }

  navigateToMovieList() {
    this.router.navigate(["movie-list"])
  }

  navigateToEditMovie() {
    this.router.navigate(["edit-movie"])
  }
}
