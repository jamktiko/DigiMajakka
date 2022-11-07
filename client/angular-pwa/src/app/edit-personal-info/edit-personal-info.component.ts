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
		school: '',
		city: '',
		year: '',
	};

	@Input() loggedProfile: any;
	@Input() school: any;
	@Input() city: any;

	@Output() updatedProfile = new EventEmitter();

	constructor(
		private editservice: StateManagementService,
		private profileservice: ProfilesService
	) {}

	changeVisibility() {
		this.editservice.togglePersonalVisibility();
	}

	ngOnInit(): void {
		this.info.firstname = this.loggedProfile[0].firstname;
		this.info.lastname = this.loggedProfile[0].familyname;
		this.info.field = this.loggedProfile[0].studyfield;
		this.info.school = this.school.name;
		this.info.city = this.city.name;
	}

	// Method that has the functionality for submitting the form
	onSubmit(formdata: any) {
		this.profileservice.updateProfile(
			this.loggedProfile[0].userprofileid,
			`{"aboutme": "${formdata.aboutme}", "lookingfor": "${formdata.lookingfor}"}`
		);
		console.log('Submitted');
		this.changeVisibility();
		this.updatedProfile.emit();
	}
}
