import { Component } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { Seat, SeatCategory } from '../model/seatInterface';
import { LocalDatabase, OperationFeedback } from '../model/localDatabase';


@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.css'],
  providers: [LocalDatabase]
})



export class HallListComponent {
  static idCounter : number = -1

  cinemaHalls: CinemaHall[]
  activeHall: CinemaHall = dummyCinemaHall
  editingHall: boolean = false
  scheduling : boolean = false
  deletationConflicts: boolean = false


  constructor(
    private localDatabase : LocalDatabase
  ) {
    this.cinemaHalls = this.localDatabase.getHalls()
  }

  editCinemaHall(cinemaHall: CinemaHall) {
    this.scheduling = false
    this.activeHall = cinemaHall
    this.editingHall = true
  }

  createNewHall() {
    let seat: Seat = new Seat(-1, 1, SeatCategory.Normal, false)
    let seats: Seat[][] = [[seat]]
    this.activeHall = new CinemaHall(-1, "hall name", seats, false, false, false)
    this.editingHall = true
  }

  deleteHall(hall: CinemaHall) {
    this.deletationConflicts = false
    console.log("deleting " + hall.hallId + " " + hall.hallName + "...")
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
}
