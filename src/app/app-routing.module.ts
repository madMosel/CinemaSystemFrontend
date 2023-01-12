import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CinemaHallDisplayModuleComponent } from './cinema-hall-display-module/cinema-hall-display-module.component';


const routes: Routes = [
  {path: "cinema-hall-display-module", component: CinemaHallDisplayModuleComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
