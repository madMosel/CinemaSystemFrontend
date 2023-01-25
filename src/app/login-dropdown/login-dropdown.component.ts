import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dropdown',
  templateUrl: './login-dropdown.component.html',
  styleUrls: ['./login-dropdown.component.css']
})
export class LoginDropdownComponent {
  constructor (
    private readonly router : Router
  ) {}

  navigateToSignIn() {
    this.router.navigate(["sign-in"])
  }
}
