import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CinemaHallDisplayComponent } from './cinema-hall-display/cinema-hall-display.component';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';
import { EditCinemaHallComponent } from './edit-cinema-hall/edit-cinema-hall.component';
import { ManagmentViewComponent } from './managment-view/managment-view.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';


const routes: Routes = [
  {path: "cinema-hall-display", component: CinemaHallDisplayComponent},
  {path: "movie-browser", component: MovieBrowserComponent},
  {path: "edit-cinema-hall", component: EditCinemaHallComponent},
  {path: "managment-view", component: ManagmentViewComponent},
  {path: "movie-display", component: MovieDisplayComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
