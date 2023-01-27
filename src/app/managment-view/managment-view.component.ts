import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managment-view',
  templateUrl: './managment-view.component.html',
  styleUrls: ['./managment-view.component.css']
})
export class ManagmentViewComponent {
    constructor(
      private readonly router: Router
    ) {
      this.schedule()
    }

    showHallList() {
      this.router.navigate(["managment-view/hall-list"])
    }

    showMovieList() {
      this.router.navigate(["managment-view/movie-list"])
    }

    schedule() {
      this.router.navigate(["managment-view/schedule"])
    }
}
