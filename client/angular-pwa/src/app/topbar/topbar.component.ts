import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private location: Location) { }

  back():void {
    // NOT IMPLEMENTED YET
  }

  ngOnInit(): void {
  }

}