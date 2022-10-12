import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joblistsmall',
  templateUrl: './joblistsmall.component.html',
  styleUrls: ['./joblistsmall.component.css']
})
export class JoblistsmallComponent implements OnInit {

  constructor() { }

  // jobs-array will contain all job-listing fetched from the database
  jobs = ['asd', 'qwerty'];

  ngOnInit(): void {
  }

}
