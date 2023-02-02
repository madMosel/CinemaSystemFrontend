import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDatabase } from '../model/localDatabase';

@Component({
  selector: 'app-login-dropdown',
  templateUrl: './login-dropdown.component.html',
  styleUrls: ['./login-dropdown.component.css']
})
export class LoginDropdownComponent {
  @Input() dropdownItem : any;

  private username?: string
  private password?: string

  constructor(
    private readonly router: Router,
    private readonly localDatabase: LocalDatabase
  ) { }

  updateUsername(event : Event) {
    let input : HTMLInputElement = event.target as HTMLInputElement
    this.username = input.value
  }

  updatePassword(event : Event) {
    let input : HTMLInputElement = event.target as HTMLInputElement
    this.password = input.value
  }

  submit() {
    if (!this.username || !this.password || this.username === "" || this.password === "") return
    this.localDatabase.login(this.username, this.password)
  }

  navigateToSignIn() {
    this.dropdownItem.close();
    this.router.navigate(["sign-in"])
  }
}
