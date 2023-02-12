import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDatabase } from '../model/localDatabase';

@Component({
  selector: 'app-managment-view',
  templateUrl: './managment-view.component.html',
  styleUrls: ['./managment-view.component.css']
})
export class ManagmentViewComponent {
  databaseChanged: boolean = false;
  databaseChangedObserver = {
    next: (b : boolean) => this.databaseChanged = b
  }

  constructor(
    private readonly router: Router,
    private readonly database: LocalDatabase
    ) {
      this.schedule()
      database.change.subscribe(this.databaseChangedObserver)
      this.databaseChanged = database.getChanged()
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

    updateDatabase() {
      this.database.updateServer()
    }
  }
