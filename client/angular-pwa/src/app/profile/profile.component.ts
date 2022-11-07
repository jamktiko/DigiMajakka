import {Component, OnInit, Output, EventEmitter} from '@angular/core';
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
		private editservice: StateManagementService,
		private profileservice: ProfilesService
	) {}

	loggedProfile: Profile[] = [
		{
			City_cityid: 1,
			School_schoolid: 1,
			UserAccount_email: 'Sähköposti',
			aboutme: 'Kerro jotain itsestäsi',
			familyname: 'Sukunimi',
			firstname: 'Etunimi',
			lookingfor: 'Kerro, millaista työtä haluaisit tehdä.',
			phonenumber: '0400111222',
			picturelink: 'jokukuva',
			public: 0,
			studyfield: 'Koulutusohjelma',
			userprofileid: 1,
			yearofstudy: 1,
		},
	];
	skills: any = [];
	someLinks: any = [];
	city: any = [
		{
			cityid: 0,
			name: 'Kaupunki',
		},
	];
	school: any = [
		{
			name: 'Koulun nimi',
		},
	];

	ngOnInit(): void {
		this.getLoggedInProfile();
	}

	refresh(): void {
		window.location.reload();
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

	getLoggedProfileCity(id: number): void {
		this.profileservice.getProfileCity(id).subscribe((city) => {
			this.city = city;
			console.log(this.city[0]);
		});
	}

	getLoggedProfileSchool(id: number): void {
		this.profileservice.getProfileSchool(id).subscribe((school) => {
			this.school = school;
			console.log(this.school[0]);
		});
	}

	getLoggedInProfile(): void {
		this.profileservice.getLoggedInProfile().subscribe((profile) => {
			this.loggedProfile = profile;

			this.getLoggedProfileSkills(this.loggedProfile[0].userprofileid);

			this.getLogggedProfileLinks(this.loggedProfile[0].userprofileid);

			this.getLoggedProfileCity(this.loggedProfile[0].City_cityid);

			this.getLoggedProfileSchool(this.loggedProfile[0].School_schoolid);

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
