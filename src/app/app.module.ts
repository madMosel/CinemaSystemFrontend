import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CinemaHallDisplayComponent } from './cinema-hall-display/cinema-hall-display.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';
import { EditCinemaHallComponent } from './edit-cinema-hall/edit-cinema-hall.component';
import { ManagmentViewComponent } from './managment-view/managment-view.component';
import { HallListComponent as HallListComponent } from './hall-list/hall-list.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginDropdownComponent } from './login-dropdown/login-dropdown.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MovieScheduleComponent } from './movie-schedule/movie-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    CinemaHallDisplayComponent,
    MovieBrowserComponent,
    EditCinemaHallComponent,
    ManagmentViewComponent,
    HallListComponent,
    MovieListComponent,
    EditMovieComponent,
    MovieDisplayComponent,
    LoginDropdownComponent,
    SignInComponent,
    MovieScheduleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
