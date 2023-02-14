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
    next: (loginData: Login | null) => {
      if (loginData === null) this.localUser = undefined
      else this.localUser = loginData as Login
    }
  }

  constructor(
    private readonly router: Router,
    private readonly database: LocalDatabase
  ) {
    database.localUserChange.subscribe(this.localUserObserver)
    database.login("root", "root")
    let user = database.getLocalUser()
    if (user != null) this.localUser = user
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

  navigateToBuyTickets() {
    this.router.navigate(["tickets-buy"])
  }
}
