import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobService} from '../job.service';

@Component({
	selector: 'app-job-announcement',
	templateUrl: './job-announcement.component.html',
	styleUrls: ['./job-announcement.component.css'],
})
export class JobAnnouncementComponent implements OnInit {
	// Variables to hold breadcrumb data that is sent to breadcrumb-component
	breadcrumbColor: string = 'blue';
	breadcrumbRoute: any = [
		{name: 'Opiskelijalle', route: '/student'},
		{name: 'Työpaikat', route: '/student/joblist'},
		{name: 'Työilmoitus', route: 'LISÄÄ TÄHÄN REITTI'},
	];

	employerInfo = 'Esimerkki';
	payInfo = 'Placeholder';
	startInfo = 'ETC';
	contactInfo = 'ETC';
	emailInfo = 'ETC';
	phoneInfo = 'ETC';

	info = {
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		message: '',
	};

	listing: any = [];

	listingid!: string;
	private sub: any;

	constructor(
		private route: ActivatedRoute,
		private jobService: JobService
	) {}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe((params) => {
			this.listingid = params['id']; // (+) is used to convert 'id' into a number
			// console.log(this.listingid);
			this.jobService.jobById(this.listingid).subscribe((listing) => {
				this.listing = listing;
				// console.log(this.listing);
			});
		});
	}

	// Method that has the functionality for submitting the form
	onSubmit(formdata: any) {
		// ADD FUNCTIONALITY
		this.info.firstname = formdata.firstname;
		console.log(this.info.firstname);
	}
}
