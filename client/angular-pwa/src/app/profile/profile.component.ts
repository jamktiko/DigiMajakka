import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ProfileEditService} from '../profile-edit.service';
import {StateManagementService} from '../state-management.service';
import {ProfilesService} from '../profiles.service';

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

	loggedProfile: any = [{}];

	ngOnInit(): void {
		this.getLoggedInProfile();
	}

	getLoggedInProfile(): void {
		this.profileservice.getLoggedInProfile();
		this.loggedProfile = this.profileservice.loggedProfile;
		console.log(this.loggedProfile);
		// KOKEILE HAKEA TÄMÄN TULOKSEN PROFIILI-ID:N PERUSTEELLA OIKEA PROFIILI KÄYTTÄEN FINDBYID???
	}

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
