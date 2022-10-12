import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Service for managing logins
  // WILL BE IMPLEMENTED LATER

  // Declarations for placeholder functionality
  logged!: boolean;
  loggedUser = '';

  constructor() { }

  // Placeholder ethod that takes username as an argument and sets it as currently logged in user.
  // Also set logged-status as true.
  login(username: string) {
    this.logged = true;
    this.loggedUser = username;
  }

  // Placeholder method that sets currently logged in user as empty and sets logged-status to false. 
  logout() {
    this.logged = false;
    this.loggedUser = '';
  }

}
