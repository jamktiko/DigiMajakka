import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JobService} from '../job.service';

@Component({
	selector: 'app-employer',
	templateUrl: './employer.component.html',
	styleUrls: ['./employer.component.css'],
})
export class EmployerComponent implements OnInit {
	info = {
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		employer: '',
		companyname: '',
		assignment: '',
		description: '',
		payment: '',
		calendar: '',
	};

	today = Date();
	constructor(private jobservice: JobService) {}

	ngOnInit(): void {}

	// Method that has the functionality for submitting the form
	onSubmit(formdata: any) {
		// ADD FUNCTIONALITY
		console.log(this.info);
		this.jobservice.postJobAnnoucement(this.info);
	}
}
