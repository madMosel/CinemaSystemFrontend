import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CinemaHallDisplayModuleComponent } from './cinema-hall-display-module/cinema-hall-display-module.component';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';
import { EditCinemaHallComponent } from './edit-cinema-hall/edit-cinema-hall.component';


const routes: Routes = [
  {path: "cinema-hall-display-module", component: CinemaHallDisplayModuleComponent},
  {path: "movie-browser", component: MovieBrowserComponent},
  {path: "edit-cinema-hall", component: EditCinemaHallComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
