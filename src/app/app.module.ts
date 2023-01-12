import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CinemaHallDisplayModuleComponent } from './cinema-hall-display-module/cinema-hall-display-module.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    CinemaHallDisplayModuleComponent,
    MovieBrowserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
