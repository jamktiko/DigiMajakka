import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logged!: boolean;
  loggedUser = '';

  constructor() { }

  // Method that takes username as an argument and sets it as currently logged in user.
  // Also set logged-status as true.
  login(username: string) {
    this.logged = true;
    this.loggedUser = username;
  }

  // Method that sets currently logged in user as empty and sets logged-status to false. 
  logout() {
    this.logged = false;
    this.loggedUser = '';
  }

}
