import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StateManagementService} from '../state-management.service';

@Component({
	selector: 'app-edit-contact-info',
	templateUrl: './edit-contact-info.component.html',
	styleUrls: ['./edit-contact-info.component.css'],
})
export class EditContactInfoComponent implements OnInit {
	// Declarations for the form-values
	info = {
		email: '',
		phone: '',
		linkedin: '',
		instagram: '',
		facebook: '',
		twitter: '',
	};

	showUnsavedChanges: boolean = false;

	// Declaration for FormGroup
	detailForm!: FormGroup;

	reference: any;
	hasChanges: boolean = false;

	constructor(private editservice: StateManagementService) {}

	// Creates a reference of the initial form values
	createReference(obj: any) {
		this.reference = Object.assign({}, obj);
	}

	// Returns true if the user has changed the value in the form
	isDifferent(obj: any, prop: string) {
		return this.reference[prop] !== obj[prop];
	}

	changeVisibility(info: any) {
		for (let prop in info) {
			if (this.isDifferent(info, prop)) {
				this.hasChanges = true;
			}
		}
		if (!this.hasChanges) {
			this.editservice.toggleContactVisibility();
		} else {
			this.showUnsavedChanges = true;
		}
	}

	onSubmit(formdata: any) {}

	ngOnInit(): void {
		this.createReference(this.info);
	}
}
