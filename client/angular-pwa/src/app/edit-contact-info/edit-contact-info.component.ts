import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileEditService} from '../profile-edit.service';

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

	visible: boolean;

	// Declaration for FormGroup
	detailForm!: FormGroup;

	constructor(private editservice: ProfileEditService) {
		this.visible = editservice.contactEdit;
	}

	changeVisibility() {
		this.editservice.toggleContactVisibility();
	}

	onSubmit(formdata: any) {}

	ngOnInit(): void {}
}
