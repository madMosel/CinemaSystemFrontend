import { Component, Input } from '@angular/core';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase } from '../model/localDatabase';
import { Login } from '../model/loginInteface';
import { Schedule } from '../model/scheduleInterface';
import { Seat } from '../model/seatInterface';
import { Ticket } from '../model/ticketInterface';

@Component({
  selector: 'app-tickets-buy',
  templateUrl: './tickets-buy.component.html',
  styleUrls: ['./tickets-buy.component.css']
})
export class TicketsBuyComponent {
  @Input() schedule: Schedule = {} as Schedule
  hall : CinemaHall = dummyCinemaHall
  localUser?: Login
  localUserObserver = {
    next: (loginData: Login| null) => {
      if (loginData === null) this.localUser = undefined
      else this.localUser = loginData as Login
    }
  }

  constructor (private readonly database : LocalDatabase) {
    let user = database.getLocalUser()
    if (user != null) this.localUser = user
  }

  ticketCart : Ticket[] = []

  clickSeatCallback = (seat: Seat) => {
    if (!this.localUser) return
    // if ()

    // let ticket = {
    //   schedule: this.schedule,
    //   seatId: seat.id,
    //   username: this.localUser.username
    // } as Ticket

    // this.ticketCart.push(ticket)
  }
}
