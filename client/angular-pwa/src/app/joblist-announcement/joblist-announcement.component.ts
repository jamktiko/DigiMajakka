import {Component, OnInit} from '@angular/core';
import {JobService} from '../job.service';

@Component({
	selector: 'app-joblist-announcement',
	templateUrl: './joblist-announcement.component.html',
	styleUrls: ['./joblist-announcement.component.css'],
})
export class JoblistAnnouncementComponent implements OnInit {
	annoucements: any = [];
	jobDescription: string = this.annoucements.description;

	constructor(private jobService: JobService) {}

	ngOnInit(): void {
		this.getJobs();
	}
	getJobs(): void {
		this.jobService
			.getJobs()
			.subscribe((annoucements) => (this.annoucements = annoucements));
	}
}
