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
	jobs: any = [];

	// getJobs() called when compoent is created
	ngOnInit(): void {
		this.getJobs();
	}

	// Method to get all joblistings from the database by calling the getJobs()-method in jobservice
	getJobs(): void {
		this.jobService.getJobs().subscribe((jobs) => (this.jobs = jobs));
	}
}
