import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CinemaHallDisplayComponent } from './cinema-hall-display/cinema-hall-display.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieBrowserComponent } from './movie-browser/movie-browser.component';
import { EditCinemaHallComponent } from './edit-cinema-hall/edit-cinema-hall.component';
import { ManagmentViewComponent } from './managment-view/managment-view.component';
import { ItemBrowserComponent } from './item-browser/item-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    CinemaHallDisplayComponent,
    MovieBrowserComponent,
    EditCinemaHallComponent,
    ManagmentViewComponent,
    ItemBrowserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
