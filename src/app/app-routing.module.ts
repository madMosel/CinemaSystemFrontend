import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CinemaHallDisplayModuleComponent } from './cinema-hall-display-module/cinema-hall-display-module.component';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';


const routes: Routes = [
  {path: "cinema-hall-display-module", component: CinemaHallDisplayModuleComponent},
  {path: "movie-browser", component: MovieBrowserComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
