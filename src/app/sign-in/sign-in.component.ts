import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDatabase } from '../model/localDatabase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  nameWarning: boolean = false;
  pwWarning: boolean = false;
  name?: string;
  pw1?: string;
  pw2?: string;

  constructor(
    private readonly database: LocalDatabase,
    private readonly router: Router
  ) {

  }

  username(event: Event) {
    this.name = (event.target as HTMLInputElement).value
  }
  password1(event: Event) {
    this.pw1 = (event.target as HTMLInputElement).value
  }
  password2(event: Event) {
    this.pw2 = (event.target as HTMLInputElement).value
  }
  signIn() {
    this.nameWarning = false
    this.pwWarning = false
    if (!this.username) {
      this.nameWarning = true
      return
    }
    if (!this.pw1 || !this.pw2 || this.pw1 != this.pw2) {
      this.pwWarning = true
      return
    }
    this.database.signIn(this.name!, this.pw1, (flag) => {
      if (flag) {
        this.database.login(this.name!, this.pw1!)
        this.router.navigate(["movie-browser"])
      }
      else this.nameWarning = true
    })
  }

}
