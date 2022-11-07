import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StateManagementService} from '../state-management.service';

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

	visible: boolean;

	constructor(private editservice: StateManagementService) {
		this.visible = editservice.personalEdit;
	}

	changeVisibility() {
		this.editservice.togglePersonalVisibility();
	}

	ngOnInit(): void {}

	// Method that has the functionality for submitting the form
	onSubmit(formdata: any) {
		// ADD FUNCTIONALITY
		this.info.firstname = formdata.firstname;
		console.log(this.info.firstname);
	}
}
