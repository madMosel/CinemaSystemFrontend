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
  }

  navigateToCinemaHallModule() {
    this.router.navigate(["cinema-hall-display-module"]);
  }
}
