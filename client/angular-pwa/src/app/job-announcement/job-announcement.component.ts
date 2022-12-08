import {Component, OnInit} from '@angular/core';

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
	constructor() {}

	ngOnInit(): void {}

	// Method that has the functionality for submitting the form
	onSubmit(formdata: any) {
		// ADD FUNCTIONALITY
		this.info.firstname = formdata.firstname;
		console.log(this.info.firstname);
	}
}
