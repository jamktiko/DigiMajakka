import {Component, OnInit} from '@angular/core';
import {JobService} from '../job.service';

@Component({
	selector: 'app-joblistsmall',
	templateUrl: './joblistsmall.component.html',
	styleUrls: ['./joblistsmall.component.css'],
})
export class JoblistsmallComponent implements OnInit {
	constructor(private jobService: JobService) {}

	// jobs-array will contain all job-listing fetched from the database
	// REPLACE PLACEHOLDER DATA WITH REAL DATA
	jobs: any = [];

	ngOnInit(): void {
		this.getJobs();
	}

	getJobs(): void {
		this.jobService.getJobs().subscribe((jobs) => (this.jobs = jobs));
	}
}
