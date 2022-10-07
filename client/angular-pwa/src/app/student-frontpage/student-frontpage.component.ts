import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-student-frontpage',
  templateUrl: './student-frontpage.component.html',
  styleUrls: ['./student-frontpage.component.css']
})
export class StudentFrontpageComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  logged = this.loginService.logged;
  loggedUser = this.loginService.loggedUser;

  ngOnInit(): void {
  }

  login() {
    this.loginService.login('testi');
    this.logged = this.loginService.logged;
    this.loggedUser = this.loginService.loggedUser;
  }

  logout() {
    this.loginService.logout();
    this.logged = this.loginService.logged;
    this.loggedUser = this.loginService.loggedUser;
  }

}
