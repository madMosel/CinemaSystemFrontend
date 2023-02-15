import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase } from '../model/localDatabase';
import { Login } from '../model/loginInteface';
import { Schedule } from '../model/scheduleInterface';
import { Seat, SeatState } from '../model/seatInterface';
import { Ticket } from '../model/ticketInterface';

@Component({
  selector: 'app-tickets-buy',
  templateUrl: './tickets-buy.component.html',
  styleUrls: ['./tickets-buy.component.css']
})
export class TicketsBuyComponent implements OnInit {

  @Input() schedule: Schedule = {} as Schedule
  hall: CinemaHall = dummyCinemaHall
  localUser?: Login
  localUserObserver = {
    next: (loginData: Login | null) => {
      if (loginData === null) this.localUser = undefined
      else this.localUser = loginData as Login
    }
  }

  // @ts-ignore
  private routeSubscription: Subscription

  constructor(
    private readonly database: LocalDatabase,
    private route: ActivatedRoute
  ) {
    database.localUserChange.subscribe(this.localUserObserver)
    let user = database.getLocalUser()
    if (user != null) this.localUser = user
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      let schedule = JSON.parse(params["schedule"]) as Schedule
      let hall = this.database.loadHallState(schedule, (hall) => {
        if (hall != null) this.hall = hall
        console.log(hall)
        console.log(this.hall)
      })
    })
  }


  ticketCart: Ticket[] = []

  clickSeatCallback = (seat: Seat) => {
    if (!this.localUser) return

    switch (seat.state) {
      case SeatState.FREE:
        let ticket = {
          schedule: this.schedule,
          seatId: seat.id,
          username: this.localUser.username
        } as Ticket


        this.ticketCart.push(ticket)
        seat.state = SeatState.RESERVED
        break
      case SeatState.RESERVED:
        //reserved by me? set state to free : display reserved msg
        break
      case SeatState.BOOKED:
        //booked by me? storno popup
        break
    }


  }
}
