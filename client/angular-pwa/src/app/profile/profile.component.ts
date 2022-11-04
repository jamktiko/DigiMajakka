import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ProfileEditService} from '../profile-edit.service';
import {StateManagementService} from '../state-management.service';
import {ProfilesService} from '../profiles.service';
import {Profile} from '../profile';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
	constructor(
		private editservice: ProfileEditService,
		private stateservice: StateManagementService,
		private profileservice: ProfilesService
	) {}

	loggedProfile!: Profile[];
	skills: any = [];
	someLinks: any = [];

	ngOnInit(): void {
		this.getLoggedInProfile();
	}

	getLoggedProfileSkills(id: number): void {
		this.profileservice.getProfileSkills(id).subscribe((skills) => {
			this.skills = skills;
			console.log(this.skills);
		});
	}

	getLogggedProfileLinks(id: number): void {
		this.profileservice.getProfileSomeLinks(id).subscribe((links) => {
			this.someLinks = links;
			console.log(this.someLinks);
		});
	}

	getLoggedInProfile(): void {
		this.profileservice.getLoggedInProfile().subscribe((profile) => {
			this.loggedProfile = profile;

			this.getLoggedProfileSkills(this.loggedProfile[0].userprofileid);

			this.getLogggedProfileLinks(this.loggedProfile[0].userprofileid);

			console.log(this.loggedProfile[0]);
		});
	}

	// getLoggedInProfile(): void {
	// 	this.profileservice.getLoggedInProfile();
	// 	setTimeout(() => {
	// 		this.loggedProfile = this.profileservice.loggedProfile;
	// 		 this.loggedProfile.forEach(
	// 		 	(item: {[s: string]: unknown} | ArrayLike<unknown>) => {
	// 		 		for (const [key, value] of Object.entries(item)) {
	// 		 			console.log(key, value);
	// 		 		}
	// 		 	}
	// 		 );
	// 		console.log(this.loggedProfile);
	// 	}, 3000);
	// }

	get isEditVisible(): boolean {
		return this.editservice.contactEdit;
	}

	changeVisibility() {
		this.editservice.toggleContactVisibility();
	}

	get isPhotoVisible(): boolean {
		return this.editservice.addPhotoEdit;
	}

	changePhotoVisibility() {
		this.editservice.toggleContactVisibilityPhoto();
	}

	get isPersonalEditVisible(): boolean {
		return this.editservice.personalEdit;
	}

	changePersonalEditVisibility() {
		this.editservice.togglePersonalVisibility();
	}

	get isAboutMeEditVisible(): boolean {
		return this.editservice.aboutMeEdit;
	}

	changeAboutMeEditVisibility() {
		this.editservice.toggleAboutMeVisibility();
	}

	get isAttachmentEditVisible(): boolean {
		return this.editservice.attachmentEdit;
	}

	changeAttachmentEditVisibility() {
		this.editservice.toggleAttachmentVisibility();
	}
}
