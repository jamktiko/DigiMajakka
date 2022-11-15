import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-job-announcement',
	templateUrl: './job-announcement.component.html',
	styleUrls: ['./job-announcement.component.css'],
})
export class JobAnnouncementComponent implements OnInit {
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
	constructor() {}

	ngOnInit(): void {}

	// Method that has the functionality for submitting the form
	onSubmit(formdata: any) {
		// ADD FUNCTIONALITY
		this.info.firstname = formdata.firstname;
		console.log(this.info.firstname);
	}
}
