import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobService} from '../job.service';

@Component({
	selector: 'app-delete-job-advert',
	templateUrl: './delete-job-advert.component.html',
	styleUrls: ['./delete-job-advert.component.css'],
})
export class DeleteJobAdvertComponent implements OnInit {
	public id: string | null = '';
	constructor(
		private jobservice: JobService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		// Take adverts id from url parameter
		this.id = this.route.snapshot.paramMap.get('id');
		// Use jobservices delete method to delete advert
		this.jobservice.deleteJobAnnoucement(this.id).subscribe(() => {
			console.log('Deleted advert');
		});
	}
}
