import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CinemaHall, dummyCinemaHall } from '../model/cinemaHallInterface';
import { LocalDatabase } from '../model/localDatabase';
import { Login } from '../model/loginInteface';
import { niceDateToString } from '../model/niceDateInterface';
import { copySchedule, Schedule } from '../model/scheduleInterface';
import { Seat, SeatCategory, SeatState } from '../model/seatInterface';
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
    private route: ActivatedRoute,
    private readonly router: Router
  ) {
    database.localUserChange.subscribe(this.localUserObserver)
    let user = database.getLocalUser()
    if (user != null) this.localUser = user
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.schedule = JSON.parse(params["schedule"]) as Schedule
      this.dateString = niceDateToString(this.schedule.dateTime)
      this.loadHallState()
    })
  }

  loadHallState() {
    this.database.loadHallState(this.schedule, (hall) => {
      if (hall != null) {
        this.hall = hall
        this.movieTitle = this.database.getMovieById(this.schedule.movieId)?.movieTitle
      }
    })
  }


  cart: CartEntry[] = []
  total: number = 0

  clickSeatCallback = (seat: Seat) => {
    if (!this.localUser) return

    switch (seat.state) {
      case SeatState.FREE:
        let ticket = {
          schedule: copySchedule(this.schedule),
          seatId: seat.id,
          username: this.localUser.username,
          price: this.calculateTicketPrice(seat)
        } as Ticket
        this.cart.push({ seat: seat, ticket: ticket } as CartEntry)
        seat.state = SeatState.RESERVED
        break
      case SeatState.RESERVED:
        let i: number = 0
        for (let e of this.cart) {
          if (e.seat.id == seat.id) {
            this.total -= (this.cart.splice(i, 1) as CartEntry[])[0].ticket.price!
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

  calculateTicketPrice(seat: Seat): number {
    let price = this.database.getMovieById(this.schedule.movieId)!.price
    if (this.schedule.dateTime.hour >= 20 && this.schedule.dateTime.hour <= 22) price *= 1.2
    if (seat.category == SeatCategory.PREMIUM) price *= 1.3
    if (seat.id / this.hall.seats[0].length < 1) price *= 1.1
    else if (seat.id / this.hall.seats[0].length >= this.hall.seats.length) price *= 0.8
    if (this.hall.dolby) price += 1
    if (this.hall.d3) price += 1
    if (this.hall.d4) price +=1

    price = Number(price.toFixed(0))
    this.total += price
    return price
  }

  printTicketInfo(ticket: Ticket): string {
    return ticket.seatId + "   " + ticket.price + "€"
  }


  buyTickets() {
    let tickets: Ticket[] = []
    for (let entry of this.cart) tickets.push(entry.ticket)
    this.database.putTickets(tickets, (answerFlag) => {
      if (answerFlag) {
        this.router.navigate(["my-tickets"])
      }
      else {
        this.loadHallState()
      }
    })
  }
}
