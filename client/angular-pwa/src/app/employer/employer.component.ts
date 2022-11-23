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
		console.log(
			`{"firstname":"${this.info.firstname}, "familyname":"${this.info.lastname}", "company":"${this.info.companyname}", "startdate":"2022-12-12", "email":"${this.info.email}", "phonenumber":"${this.info.phone}, "jobtitle":"${this.info.assignment}, "description":"${this.info.description}, "salary":"${this.info.payment}, "city":"Muurame"}`
		);
		this.jobservice
			.postJobAnnoucement(
				`{"firstname":"${this.info.firstname}, 
				"familyname":"${this.info.lastname}", 
				"company":"${this.info.companyname}", 
				"startdate":"2022-12-12", 
				"email":"${this.info.email}", 
				"phonenumber":"${this.info.phone}, 
				"jobtitle":"${this.info.assignment}, 
				"description":"${this.info.description}, 
				"salary":"${this.info.payment}, 
				"city":"Muurame"}`
			)
			.subscribe(() => {
				console.log('Data has been moved!');
			});
	}
}
