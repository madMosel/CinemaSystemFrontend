import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDatabase } from '../model/localDatabase';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent {
  @Input() dropdownItem : any;

  constructor(
    private readonly router : Router,
    private readonly database : LocalDatabase
  ) {}
  
  logout() {
    this.dropdownItem.close();
    this.database.logout()
  }
}
