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
import { LocalDatabase } from './model/localDatabase';
import { TableComponent } from './table/table.component';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { MovieSchemeComponent } from './movie-scheme/movie-scheme.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TicketsBuyComponent } from './tickets-buy/tickets-buy.component';

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
    TableComponent,
    UserDropdownComponent,
    MovieSchemeComponent,
    MovieDetailsComponent,
    TicketsBuyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    LocalDatabase],
  bootstrap: [AppComponent],
})
export class AppModule { }
