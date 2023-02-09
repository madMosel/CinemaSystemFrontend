import { Component } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { Seat, SeatCategory, SeatState } from '../model/seatInterface';
import { LocalDatabase, OperationFeedback } from '../model/localDatabase';


@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.css'],
})



export class HallListComponent {

  cinemaHalls: CinemaHall[] = []
  activeHall: CinemaHall = dummyCinemaHall
  editingHall: boolean = false
  scheduling : boolean = false
  deletationConflicts: boolean = false


  constructor(
    private localDatabase : LocalDatabase
  ) {
     this.loadHalls()
  }

  editCinemaHall(cinemaHall: CinemaHall) {
    this.scheduling = false
    this.activeHall = cinemaHall
    this.editingHall = true
  }

  createNewHall() {
    let seat: Seat = new Seat(1, SeatCategory.Normal, SeatState.FREE)
    let seats: Seat[][] = [[seat]]
    this.activeHall = new CinemaHall(0, "hall name", seats, false, false, false)
    this.editingHall = true
  }

  deleteHall(hall: CinemaHall) {
    this.deletationConflicts = false
    let feedback: OperationFeedback = this.localDatabase.deleteHall(hall)
    switch (feedback) {
      case OperationFeedback.HAS_REFERING_OBJECTS:
        this.deletationConflicts = true
        break
      case OperationFeedback.OK:
        this.cinemaHalls = this.localDatabase.getHalls()
        break
    }
    console.log(feedback)
    }

    loadHalls = () : void => {
      this.cinemaHalls = this.localDatabase.getHalls()
    }
}
