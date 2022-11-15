import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StateManagementService} from '../state-management.service';
import {ProfilesService} from '../profiles.service';

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

	// loggedProfile and someLinks come from profile-component
	@Input() loggedProfile: any;
	@Input() someLinks: any;

	// when the form is submitted, sends an event to profile-component
	@Output() updatedProfile = new EventEmitter();

	// showUnsavedChanges: boolean = false;

	// Declaration for FormGroup
	detailForm!: FormGroup;

	// reference: any;
	// hasChanges: boolean = false;

	constructor(
		private stateservice: StateManagementService,
		private profileservice: ProfilesService
	) {}

	// All form-inputs are initialized as the current values from the profile, when the component is created
	ngOnInit(): void {
		// this.createReference(this.info);
		this.info.email = this.loggedProfile[0].email;
		this.info.phone = this.loggedProfile[0].phonenumber;
		this.info.linkedin = this.someLinks[0].linkedin;
		this.info.instagram = this.someLinks[0].instagram;
		this.info.facebook = this.someLinks[0].facebook;
		this.info.twitter = this.someLinks[0].twitter;
	}

	// Creates a reference of the initial form values
	// createReference(obj: any) {
	// 	this.reference = Object.assign({}, obj);
	// }

	// Returns true if the user has changed the value in the form
	// isDifferent(obj: any, prop: string) {
	// 	return this.reference[prop] !== obj[prop];
	// }

	// Method to hide or display the form
	changeVisibility() {
		this.stateservice.toggleContactVisibility();

		// FUNCTIONALITY FOR NOTIFYING ABOUT UNSAVED CHANGES, ADD LATER (ADD INFO AS PARAMETER TO THIS METHOD)
		// for (let prop in info) {
		// 	if (this.isDifferent(info, prop)) {
		// 		this.hasChanges = true;
		// 	}
		// }
		// if (!this.hasChanges) {
		// 	this.editservice.toggleContactVisibility();
		// } else {
		// 	this.showUnsavedChanges = true;
		// }
	}

	// When the form is submitted, send an update request to backend through the profileservice.
	// Updating the profile is done first, and after it has completed, update the links (updatelinks is inside updateprofiles subscribe)
	// Also hides the form on submit, and send an event to profile-component.
	onSubmit(formdata: any) {
		this.profileservice
			.updateProfile(
				this.loggedProfile[0].userprofileid,
				`{"email": "${formdata.email}", "phonenumber": "${formdata.phone}"}`
			)
			.subscribe(() => {
				this.profileservice
					.updateProfileLinks(
						this.loggedProfile[0].userprofileid,
						`{"linkedin": "${formdata.linkedin}", "instagram": "${formdata.instagram}", "facebook": "${formdata.facebook}", "twitter": "${formdata.twitter}"}`
					)
					.subscribe(() => {
						console.log('Submitted');
						this.changeVisibility();
						this.updatedProfile.emit();
					});
			});
	}
}
