import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joblistsmall',
  templateUrl: './joblistsmall.component.html',
  styleUrls: ['./joblistsmall.component.css']
})
export class JoblistsmallComponent implements OnInit {

  constructor() { }

  jobs = ['asd', 'qwerty'];

  ngOnInit(): void {
  }

}
