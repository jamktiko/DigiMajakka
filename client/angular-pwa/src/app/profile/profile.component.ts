import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {StateManagementService} from '../state-management.service';
import {ProfilesService} from '../profiles.service';
import {Profile} from '../profile';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
	constructor(
		private editservice: StateManagementService,
		private profileservice: ProfilesService,
		private _sanitizer: DomSanitizer
	) {}

	// boolean-variable to toggle visibility of "updated successfully" -notification
	confirmation: boolean = false;

	loggedProfile: Profile[] = [
		// Placeholder data for the profile, if can't fetch the profile from database
		{
			City_name: 'Kaupunki',
			UserAccount_School_name: 'Koulun nimi',
			UserAccount_email: 'Sähköposti',
			aboutme: 'Kerro jotain itsestäsi',
			email: 'Sähköposti',
			familyname: 'Sukunimi',
			firstname: 'Etunimi',
			lookingfor: 'Kerro, millaista työtä haluaisit tehdä.',
			phonenumber: '0400111222',
			picturelink: 'jokukuva',
			public: 1,
			studyfield: 'Koulutusohjelma',
			userprofileid: 1,
			yearofstudy: 1,
		},
	];
	// All skills of the profile will be in this array
	skills: any = [];
	// All specialskills from the skills-array will be put in this array
	specialSkills: any = [];
	// All skillfields from the skills-array will be put in this array
	skillFields: any = [];

	// Links for the profiles social-media will be in this array
	someLinks: any = [
		{
			linkedin: '',
			facebook: '',
			instagram: '',
			twitter: '',
		},
	];
	// The profiles' city will be in this array
	city: any = [
		{
			cityid: 0,
			name: 'Kaupunki',
		},
	];
	// The profiles' school will be in this array
	school: any = [
		{
			name: 'Koulun nimi',
		},
	];

	profilePhoto: any;
	isProfilePhotoLoading: boolean = false;

	// Get the logged in users profile when the component is created
	ngOnInit(): void {
		this.getLoggedInProfile();
		this.getProfilePhoto(this.loggedProfile[0].userprofileid);
	}

	// Method that reloads the window, to get updated values after updates to profile
	updated(): void {
		window.location.reload();
	}

	// Method that calls profileservive-method to get skills of the currently logged in profile.
	// Also sets specialskill and field of skill into their own arrays. Then removes duplicates from the field-array
	getLoggedProfileSkills(profileid: number): void {
		this.profileservice.getProfileSkills(profileid).subscribe((skills) => {
			this.skills = skills;
			this.specialSkills = this.skills.map(
				(skill: any) => skill.SpecialSkill
			);
			this.skillFields = this.skills.map((skill: any) => skill.Skill);
			this.skillFields = [...new Set(this.skillFields)];
			console.log(this.skills);
			console.log('Special skills: ' + this.specialSkills);
			console.log('Skillfields: ' + this.skillFields);
		});
	}

	// Method to get the links (cv, social media etc.) from the currently logged in profile
	getLoggedProfileLinks(profileid: number): void {
		this.profileservice.getProfileLinks(profileid).subscribe((links) => {
			this.someLinks = links;
			console.log(this.someLinks);
		});
	}

	// NOT NEEDED CURRENTLY
	// getLoggedProfileCity(name: string): void {
	// 	this.profileservice.getProfileCity(name).subscribe((city) => {
	// 		this.city = city;
	// 		console.log(this.city[0]);
	// 	});
	// }
	//
	// getLoggedProfileSchool(name: string): void {
	// 	this.profileservice.getProfileSchool(name).subscribe((school) => {
	// 		this.school = school;
	// 		console.log(this.school[0]);
	// 	});
	// }

	// method that gets the profile of the currently logged in user
	getLoggedInProfile(): void {
		this.profileservice.getLoggedInProfile().subscribe((profile) => {
			this.loggedProfile = profile;

			// Fetch skills and links at the same time with profile
			this.getLoggedProfileSkills(this.loggedProfile[0].userprofileid);
			this.getLoggedProfileLinks(this.loggedProfile[0].userprofileid);

			// this.getLoggedProfileCity(this.loggedProfile[0].City_cityid);
			// this.getLoggedProfileSchool(this.loggedProfile[0].School_schoolid);

			console.log(this.loggedProfile[0]);
		});
	}

	// Method to toggle the publicity value of the profile. 1 = true, 0 = false
	updatePublicity(): void {
		let value;
		if (this.loggedProfile[0].public === 0) {
			value = 1;
		} else {
			value = 0;
		}
		this.profileservice.updateProfile(
			this.loggedProfile[0].userprofileid,
			`{"public": "${value}"}`
		);
		this.updated();
	}

	// https://stackoverflow.com/questions/45530752/getting-image-from-api-in-angular-4-5
	createImageFromBlob(image: Blob) {
		let reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				this.profilePhoto = reader.result;
			},
			false
		);

		if (image) {
			reader.readAsDataURL(image);
		}
	}

	getProfilePhoto(id: number) {
		this.isProfilePhotoLoading = true;
		this.profileservice.getProfilePhoto(id).subscribe(
			(imageData) => {
				this.createImageFromBlob(imageData);
				this.isProfilePhotoLoading = false;
			},
			(error) => {
				this.isProfilePhotoLoading = false;
				console.log(error);
			}
		);
	}

	getSanitizedUrl(image: any) {
		return this._sanitizer.bypassSecurityTrustUrl(image);
	}

	// Methods to toggle visibilities of profile edit-forms
	get isEditVisible(): boolean {
		return this.editservice.contactEdit;
	}

	changeContactVisibility() {
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

	get isSkillEditVisible(): boolean {
		return this.editservice.skillEdit;
	}

	changeSkillsEditVisibility() {
		this.editservice.toggleSkillVisibility();
	}

	get isAttachmentEditVisible(): boolean {
		return this.editservice.attachmentEdit;
	}

	changeAttachmentEditVisibility() {
		this.editservice.toggleAttachmentVisibility();
	}
}
