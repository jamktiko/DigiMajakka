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

	@Input() loggedProfile: any;
	@Output() updatedProfile = new EventEmitter();

	constructor(
		private editservice: StateManagementService,
		private profileservice: ProfilesService
	) {}

	ngOnInit(): void {
		this.aboutme = this.loggedProfile[0].aboutme;
		this.lookingfor = this.loggedProfile[0].lookingfor;
	}

	onSubmit(formdata: any) {
		this.profileservice.updateProfile(
			this.loggedProfile[0].userprofileid,
			`{"aboutme": "${formdata.aboutme}", "lookingfor": "${formdata.lookingfor}"}`
		);
		console.log('Submitted');
		this.changeVisibility();
		this.updatedProfile.emit();
	}

	changeVisibility() {
		this.editservice.toggleAboutMeVisibility();
	}
}
