import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDatabase } from './model/localDatabase';
import { Login } from './model/loginInteface';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'CinemaSystemFrontend';
  localUser?: Login
  localUserObserver = {
    next: (loginData: Login) => {
      console.log("local user set")
      this.localUser = loginData
    }
  }

  constructor(
    private readonly router: Router,
    private readonly database: LocalDatabase
    ) {
    this.router.navigate(["movie-browser"]);
    database.localUserChange.subscribe(this.localUserObserver)
  }

  navigateToCinemaHallModule() {
    this.router.navigate(["cinema-hall-display"])
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

  navigateToSignIn() {
    this.router.navigate(["sign-in"])
  }
}
