import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  logged: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
    this.logged = true;
  }

  logout(): void {
    this.logged = false;
  }

}
