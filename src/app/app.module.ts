import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CinemaHallDisplayComponent } from './cinema-hall-display/cinema-hall-display.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';
import { EditCinemaHallComponent } from './edit-cinema-hall/edit-cinema-hall.component';

@NgModule({
  declarations: [
    AppComponent,
    CinemaHallDisplayComponent,
    MovieBrowserComponent,
    EditCinemaHallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
