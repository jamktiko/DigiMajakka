import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StateManagementService} from '../state-management.service';
import {ProfilesService} from '../profiles.service';
import {Profile} from '../profile';

@Component({
	selector: 'app-edit-personal-info',
	templateUrl: './edit-personal-info.component.html',
	styleUrls: ['./edit-personal-info.component.css'],
})
export class EditPersonalInfoComponent implements OnInit {
	// Declaration for form values
	info = {
		firstname: '',
		lastname: '',
		field: '',
		city: '',
		year: '',
	};

	// All the cities will be in this array
	cities: any;

	// loggedprofile and city come from the parent component (profile-component)
	@Input() loggedProfile: any;
	@Input() city: any;

	@Output() updatedProfile = new EventEmitter();

	constructor(
		private stateservice: StateManagementService,
		private profileservice: ProfilesService
	) {}

	// Method that hides or displays the form
	changeVisibility() {
		this.stateservice.togglePersonalVisibility();
	}

	// Method to fetch all cities from the database
	getCities() {
		this.profileservice.getCities().subscribe((cities) => {
			this.cities = cities;
			console.log(cities);
		});
	}

	// getCities() called in ngOnInit() to get cities when the component is created
	// all the form-inputs are initialized with the current values of the profile
	ngOnInit(): void {
		this.getCities();
		this.info.firstname = this.loggedProfile[0].firstname;
		this.info.lastname = this.loggedProfile[0].familyname;
		this.info.field = this.loggedProfile[0].studyfield;
		this.info.city = this.loggedProfile[0].City_name;
	}

	// Method that has the functionality for submitting the form
	onSubmit(formdata: any) {
		this.profileservice
			.updateProfile(
				this.loggedProfile[0].userprofileid,
				`{"firstname": "${formdata.firstname}", "familyname": "${formdata.lastname}", "studyfield": "${formdata.field}", "City_name": "${formdata.city}", "yearofstudy":"${formdata.year}"}`
			)
			.subscribe(() => {
				console.log('Submitted');
				this.changeVisibility();
				this.updatedProfile.emit();
			});
	}
}
