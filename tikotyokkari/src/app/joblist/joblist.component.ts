import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';


@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {

  jobs: any[] = [];

  constructor(private jobservice: JobService) { }

  ngOnInit(): void {
  }

  getScores(): void {
    this.jobservice.getJobs().subscribe(jobs => this.jobs = jobs);
  }

}
