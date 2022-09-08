import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forstudents',
  templateUrl: './forstudents.component.html',
  styleUrls: ['./forstudents.component.css']
})
export class ForstudentsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }


  back(): void {
    this.location.back();
  }
}
