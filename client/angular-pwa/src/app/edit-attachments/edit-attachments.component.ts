import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {StateManagementService} from '../state-management.service';
import {ProfilesService} from '../profiles.service';

@Component({
	selector: 'app-edit-attachments',
	templateUrl: './edit-attachments.component.html',
	styleUrls: ['./edit-attachments.component.css'],
})
export class EditAttachmentsComponent implements OnInit {
	attachments = {
		cv: '',
		portfolio: '',
		github: '',
	};

	// declaration for FormGroup
	detailForm!: FormGroup;

	// loggedProfile and someLinks come from profile-component
	@Input() loggedProfile: any;
	@Input() someLinks: any;

	// when the form is submitted, sends an event to profile-component
	@Output() updatedProfile = new EventEmitter();

	constructor(
		private stateservice: StateManagementService,
		private profileservice: ProfilesService
	) {}

	// All form-inputs are initialized as the current link-values
	ngOnInit(): void {
		this.attachments.cv = this.someLinks[0].cv;
		this.attachments.portfolio = this.someLinks[0].portfolio;
		this.attachments.github = this.someLinks[0].github;
	}

	// Method to hide and display the component
	changeVisibility() {
		this.stateservice.toggleAttachmentVisibility();
	}

	// When the form is submitted, send an update request to backend through the profileservice.
	// Also hides the form on submit, and send an event to profile-component.
	onSubmit(formdata: any) {
		this.profileservice.updateProfileLinks(
			this.loggedProfile[0].userprofileid,
			`{"cv": "${formdata.cv}", "portfolio": "${formdata.portfolio}", "github": "${formdata.github}"}`
		);
		console.log('Submitted');
		this.changeVisibility();
		this.updatedProfile.emit();
	}
}
