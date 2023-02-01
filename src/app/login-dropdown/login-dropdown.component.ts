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

  constructor(
    private readonly router: Router,
    private readonly localDatabase: LocalDatabase
  ) { }

  submit() {
    this.localDatabase.login("this is", "a test")
  }

  navigateToSignIn() {
    this.dropdownItem.close();
    this.router.navigate(["sign-in"])
  }
}
