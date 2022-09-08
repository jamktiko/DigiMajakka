import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-foremployer',
  templateUrl: './foremployer.component.html',
  styleUrls: ['./foremployer.component.css']
})
export class ForemployerComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }

}
