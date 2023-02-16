import { Component, OnInit } from '@angular/core';
import { LocalDatabase } from '../model/localDatabase';
import { niceDateToString } from '../model/niceDateInterface';
import { Ticket } from '../model/ticketInterface';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
  tickets: Ticket[] = []
  errorWhileLoading: boolean = false;



  constructor(
    private readonly database: LocalDatabase
  ) {
    this.database.loadTickets((tickets) => {
      if (tickets) {
        this.tickets = tickets
        this.errorWhileLoading = false
        console.log(this.tickets)
      }
      else this.errorWhileLoading = true
    })

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  hashTicket(ticket: Ticket): string {
    return JSON.stringify(ticket)
  }

  getDateString(ticket: Ticket): string {
    return niceDateToString(ticket.schedule.dateTime)
  }
  getHallName(ticket: Ticket): string {
    return this.database.getHallById(ticket.schedule.hallId)!.hallName
  }
  getMovieTitle(ticket: Ticket): string {
    return this.database.getMovieById(ticket.schedule.hallId)!.movieTitle
  }
}
