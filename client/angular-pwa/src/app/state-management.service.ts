import {Injectable} from '@angular/core';
import {States} from './interface';
import {Subject} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StateManagementService {
	// variables for visibility of components
	contactEdit: boolean = false;
	personalEdit: boolean = false;
	aboutMeEdit: boolean = false;
	addPhotoEdit: boolean = false;
	skillEdit: boolean = false;
	attachmentEdit: boolean = false;
	loginFormVisible: boolean = false;
	registerFormVisible: boolean = false;

	// Variable to hold information about if user is logged in or not
	loggedIn: boolean = false;

	// Initializing subjects to allow for automatic updates of the values in other components
	visibilityChange: Subject<boolean> = new Subject<boolean>();
	visibilityChangePersonal: Subject<boolean> = new Subject<boolean>();
	visibilityChangeAboutMe: Subject<boolean> = new Subject<boolean>();
	visibilityChangePhoto: Subject<boolean> = new Subject<boolean>();
	visibilityChangeSkills: Subject<boolean> = new Subject<boolean>();
	visibilityChangeAttachments: Subject<boolean> = new Subject<boolean>();
	visibilityChangeLoginForm: Subject<boolean> = new Subject<boolean>();
	visibilityChangeRegisterForm: Subject<boolean> = new Subject<boolean>();

	// Setting the values in the constructor
	constructor() {
		this.visibilityChange.subscribe((value) => {
			this.contactEdit = value;
		});
		this.visibilityChangePhoto.subscribe((value) => {
			this.addPhotoEdit = value;
		});
		this.visibilityChangePersonal.subscribe((value) => {
			this.personalEdit = value;
		});
		this.visibilityChangeAboutMe.subscribe((value) => {
			this.aboutMeEdit = value;
		});
		this.visibilityChangeSkills.subscribe((value) => {
			this.skillEdit = value;
		});
		this.visibilityChangeAttachments.subscribe((value) => {
			this.attachmentEdit = value;
		});
		this.visibilityChangeLoginForm.subscribe((value) => {
			this.loginFormVisible = value;
		});
		this.visibilityChangeRegisterForm.subscribe((value) => {
			this.registerFormVisible = value;
		});
	}

	// Methods that toggle the visibility-values
	toggleContactVisibility() {
		this.visibilityChange.next(!this.contactEdit);
	}

	togglePersonalVisibility() {
		this.visibilityChangePersonal.next(!this.personalEdit);
	}

	toggleAboutMeVisibility() {
		this.visibilityChangeAboutMe.next(!this.aboutMeEdit);
	}

	togglePhotoVisibility() {
		this.visibilityChangePhoto.next(!this.addPhotoEdit);
	}

	toggleSkillVisibility() {
		this.visibilityChangeSkills.next(!this.skillEdit);
	}

	toggleAttachmentVisibility() {
		this.visibilityChangeAttachments.next(!this.attachmentEdit);
	}

	toggleLoginFormVisibility() {
		this.visibilityChangeLoginForm.next(!this.loginFormVisible);
	}

	toggleRegisterFormVisibility() {
		this.visibilityChangeRegisterForm.next(!this.registerFormVisible);
	}
}
