import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CinemaHallDisplayComponent } from './cinema-hall-display/cinema-hall-display.component';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';
import { EditCinemaHallComponent } from './edit-cinema-hall/edit-cinema-hall.component';
import { ManagmentViewComponent } from './managment-view/managment-view.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HallListComponent } from './hall-list/hall-list.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  { path: "cinema-hall-display", component: CinemaHallDisplayComponent },
  { path: "movie-browser", component: MovieBrowserComponent },
  { path: "edit-cinema-hall", component: EditCinemaHallComponent },
  { path: "edit-movie", component: EditMovieComponent },
  {
    path: "managment-view", component: ManagmentViewComponent,
    children: [
      { path: "hall-list", component: HallListComponent },
      { path: "movie-list", component: MovieListComponent },
    ]
  },
  { path: "movie-display", component: MovieDisplayComponent },
  { path: "sign-in", component: SignInComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
