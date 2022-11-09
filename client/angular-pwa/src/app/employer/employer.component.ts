import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
