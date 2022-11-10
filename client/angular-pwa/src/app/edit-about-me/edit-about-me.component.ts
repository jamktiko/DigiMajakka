import {Component, Input, OnInit} from '@angular/core';
import {StateManagementService} from '../state-management.service';
import {ProfilesService} from '../profiles.service';
import {Profile} from '../profile';
import {Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'app-edit-about-me',
	templateUrl: './edit-about-me.component.html',
	styleUrls: ['./edit-about-me.component.css'],
})
export class EditAboutMeComponent implements OnInit {
	maxChars = 600;
	aboutme = '';
	lookingfor = '';
	chars = 0;

	// loggedProfile comes from profile-component
	@Input() loggedProfile: any;
	// Event to send when the form is submitted
	@Output() updatedProfile = new EventEmitter();

	constructor(
		private editservice: StateManagementService,
		private profileservice: ProfilesService
	) {}

	// Form inputs initialized as the current profile-values
	ngOnInit(): void {
		this.aboutme = this.loggedProfile[0].aboutme;
		this.lookingfor = this.loggedProfile[0].lookingfor;
	}

	// When the form is submitted send form values to profileservices updateProfile()-method.
	// Then form is closed, and the event is sent to profile-component
	onSubmit(formdata: any) {
		this.profileservice.updateProfile(
			this.loggedProfile[0].userprofileid,
			`{"aboutme": "${formdata.aboutme}", "lookingfor": "${formdata.lookingfor}"}`
		);
		console.log('Submitted');
		this.changeVisibility();
		this.updatedProfile.emit();
	}

	// Method to hide and display the component
	changeVisibility() {
		this.editservice.toggleAboutMeVisibility();
	}
}
