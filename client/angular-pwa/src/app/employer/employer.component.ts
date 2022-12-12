import {CursorError} from '@angular/compiler/src/ml_parser/lexer';
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
	// Create new date object
	currentDate: any = new Date();
	// maxDate will be set with currentDate + 6 months on onInit
	maxDate = '';
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

	// maxDate() {
	// 	this.currentDate.setMonth(this.currentDate.getMonth() + 6);
	// }

	ngOnInit(): void {
		// Set currentDate 6 months forward
		this.currentDate.setMonth(this.currentDate.getMonth() + 6);

		// Place date to maxDate variable with format yyyy-mm-dd
		this.maxDate = `${this.currentDate.getFullYear()}-${
			// If month is below 10 it is needed to place 0 before month number so calendar understands it
			// Also getMonth start counting months from 0 (january) so it is needed to + 1 to get correct date
			this.currentDate.getMonth() + 1 > 9
				? this.currentDate.getMonth() + 1
				: '0' + (this.currentDate.getMonth() + 1)
		}-${
			// If day is below 10 it is needed 0 before day number so calendar understands it
			this.currentDate.getDate() > 9
				? this.currentDate.getDate()
				: '0' + this.currentDate.getDate()
		}`;
	}

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
				"company":${
					this.info.companyname === ''
						? null
						: '"' + this.info.companyname + '"'
				}, 
				"startdate":${
					this.info.calendar === ''
						? null
						: '"' + this.info.calendar + '"'
				}, 
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
