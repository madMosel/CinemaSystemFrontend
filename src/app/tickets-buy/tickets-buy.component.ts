import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase } from '../model/localDatabase';
import { Login } from '../model/loginInteface';
import { niceDateToString } from '../model/niceDateInterface';
import { copySchedule, Schedule } from '../model/scheduleInterface';
import { Seat, SeatState } from '../model/seatInterface';
import { Ticket } from '../model/ticketInterface';



interface CartEntry {
  seat: Seat,
  ticket: Ticket
}

@Component({
  selector: 'app-tickets-buy',
  templateUrl: './tickets-buy.component.html',
  styleUrls: ['./tickets-buy.component.css']
})
export class TicketsBuyComponent implements OnInit {

  schedule: Schedule = {} as Schedule
  hall: CinemaHall = dummyCinemaHall
  localUser?: Login
  localUserObserver = {
    next: (loginData: Login | null) => {
      if (loginData === null) this.localUser = undefined
      else this.localUser = loginData as Login
    }
  }
  readyToBuy = false

  // @ts-ignore
  private routeSubscription: Subscription
  movieTitle?: string = "";
  dateString?: string;

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
      this.schedule = JSON.parse(params["schedule"]) as Schedule
      this.dateString = niceDateToString(this.schedule.dateTime)
      let hall = this.database.loadHallState(this.schedule, (hall) => {
        if (hall != null) {
          this.hall = hall
          this.movieTitle = this.database.getMovieById(this.schedule.movieId)?.movieTitle
        }
      })
    })
  }


  cart: CartEntry[] = []

  clickSeatCallback = (seat: Seat) => {
    if (!this.localUser) return

    switch (seat.state) {
      case SeatState.FREE:
        let ticket = {
          schedule: copySchedule(this.schedule),
          seatId: seat.id,
          username: this.localUser.username
        } as Ticket
        this.cart.push({ seat: seat, ticket: ticket } as CartEntry)
        seat.state = SeatState.RESERVED
        break
      case SeatState.RESERVED:
        let i: number = 0
        for (let e of this.cart) {
          if (e.seat.id == seat.id) {
            this.cart.splice(i, 1)
            seat.state = SeatState.FREE
            break
          }
          i++
        }
        break
      case SeatState.BOOKED:
        //booked by me? storno popup? ignore click = current state?
        break
    }
    if (this.cart.length > 0) this.readyToBuy = true
    else this.readyToBuy = false
  }

  printTicketInfo(ticket: Ticket): string {
    return ticket.seatId + " todo calculate ticket price"
  }

  buyTickets() {
    let tickets : Ticket[] = []
    for (let entry of this.cart) tickets.push(entry.ticket) 
      this.database.putTickets(tickets, (answerFlag) => {
        if (answerFlag) {
          //go to my tickets
        }
        else {
          //load again because of conflicts
        }
      })
    }
}
