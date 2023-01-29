import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NiceDate } from './model/niceDateInterface';
import { Test } from './model/test';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'CinemaSystemFrontend';

  constructor(private readonly router: Router) {
    // let test : Test = new Test()
    // test.val = 14
    // console.log(test.val)


    // let nd = new NiceDate ({year: 2000, month: 11, day: 1, hour: 0, minute: 12} as NiceDateInterface)
    // console.log(nd.toString())
    // console.log(nd.parseToDate())


    this.router.navigate(["movie-browser"]);
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
