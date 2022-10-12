import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joblistsmall',
  templateUrl: './joblistsmall.component.html',
  styleUrls: ['./joblistsmall.component.css']
})
export class JoblistsmallComponent implements OnInit {


  constructor() { }

  // jobs-array will contain all job-listing fetched from the database
  // REPLACE PLACEHOLDER DATA WITH REAL DATA
  jobs = [{
    id: 1, company: 'Oy yritys Ab', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    title: 'Orja'
  },
  {
    id: 2, company: 'Velehot oy', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    title: 'Fronttivelho'
  },
  {
    id: 3, company: 'AsdASasdfffassssdasdasd', desc: 'Lorem ipsum dolors asasdddddddddd daaaa aaaaa aaaaaaaaaaa aaaaa aaakdlamdöamöaaaaaaaaaaaaa',
    title: 'ASKDL'
  },
  {
    id: 4, company: 'Joku hieno yritys', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    title: 'Tietokantaosaaja'
  },
  ];

  

  ngOnInit(): void {
  }

}
