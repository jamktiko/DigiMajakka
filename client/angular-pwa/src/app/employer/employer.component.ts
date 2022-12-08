import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JobService} from '../job.service';

@Component({
	selector: 'app-employer',
	templateUrl: './employer.component.html',
	styleUrls: ['./employer.component.css'],
})
export class EmployerComponent implements OnInit {
	// Variables to hold breadcrumb data that is sent to breadcrumb-component
	breadcrumbColor: string = 'gray';
	breadcrumbRoute: any = [{name: 'Toimeksiantajalle', route: '/employer'}];

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
		city: '',
		calendar: '',
		validuntil: '',
	};

	submitThanks: boolean = false;
	toggleBool: boolean = true;
	myform = FormGroup;
	maxChars = 2500;
	today = Date();
	currentDate: any = new Date();
	constructor(private jobservice: JobService) {}

	changeEvent(event: any) {
		if (event.target.checked) {
			this.toggleBool = false;
		} else {
			this.toggleBool = true;
		}
	}

	modalHide() {
		this.submitThanks = false;
	}

	refresh(): void {
		window.location.reload();
	}

	maxDate() {
		this.currentDate.setMonth(this.currentDate.getMonth() + 6);
	}

	ngOnInit(): void {}

	// Method that has the functionality for submitting the form
	onSubmit(formdata: any) {
		// ADD FUNCTIONALITY
		console.log(
			`{"firstname":"${this.info.firstname}", 
			"familyname":"${this.info.lastname}", 
			"company":"${this.info.companyname}", 
			"startdate":"${this.info.calendar}", 
			"email":"${this.info.email}", 
			"phonenumber":"${this.info.phone}",
			"jobtitle":"${this.info.assignment}", 
			"description":"${this.info.description}", 
			"salary":"${this.info.payment}", 
			"city":"${this.info.city}",
			"validuntil":"${this.info.validuntil}"}`
		);
		this.jobservice
			.postJobAnnoucement(
				`{"firstname":"${this.info.firstname}", 
				"familyname":"${this.info.lastname}", 
				"company":"${this.info.companyname}", 
				"startdate":"${this.info.calendar}", 
				"email":"${this.info.email}", 
				"phonenumber":"${this.info.phone}",
				"jobtitle":"${this.info.assignment}", 
				"description":"${this.info.description}", 
				"salary":"${this.info.payment}", 
				"city":"${this.info.city}",
				"validuntil":"${this.info.validuntil}"}`
			)
			.subscribe(() => {
				this.submitThanks = true;
				console.log('Data has been moved!');
			});
	}
}
