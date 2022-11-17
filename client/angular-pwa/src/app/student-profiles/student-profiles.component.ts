import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Profile} from '../profile';
import {ProfilesService} from '../profiles.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
	selector: 'app-student-profiles',
	templateUrl: './student-profiles.component.html',
	styleUrls: ['./student-profiles.component.css'],
})
export class StudentProfilesComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private profileservice: ProfilesService,
		private _sanitizer: DomSanitizer
	) {}

	profileid!: number;
	private sub: any;

	profile: Profile[] = [
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

	someLinks: any = [
		{
			linkedin: '',
			facebook: '',
			instagram: '',
			twitter: '',
		},
	];

	// All skills of the profile will be in this array
	skills: any = [];

	profilePhoto: any;
	isProfilePhotoLoading: boolean = false;
	photoRatio: any;
	photoWidth: any;
	photoHeight: any;

	showContactInfo: boolean = false;

	ngOnInit(): void {
		// Subscribed to the correct profile based on the route-parameter 'id'
		this.sub = this.route.params.subscribe((params) => {
			this.profileid = +params['id']; // (+) is used to convert 'id' into a number
			console.log(this.profileid);
			this.profileservice
				.getProfileById(this.profileid)
				.subscribe((profile) => (this.profile = profile));
			console.log(this.profile);
		});

		// Get profiledata using this classes methods
		this.getProfileLinks(this.profileid);
		this.getProfilePhoto(this.profileid);
		this.getProfileSkills(this.profileid);
	}

	// Method to get the links (cv, social media etc.) from the profile
	getProfileLinks(profileid: number): void {
		this.profileservice.getProfileLinks(profileid).subscribe((links) => {
			this.someLinks = links;
			console.log(this.someLinks);
		});
	}

	// Method that calls profileservive-method to get skills of the currently logged in profile.
	// Also sets specialskill and field of skill into their own arrays. Then removes duplicates from the field-array
	getProfileSkills(profileid: number): void {
		this.profileservice.getProfileSkills(profileid).subscribe((skills) => {
			this.skills = skills;
			console.log(this.skills);
		});
	}

	// Method that fetches the profiles profile-photo from profileservices' getProfilePhoto()-method
	// The createImageFromBlob()-method is then called to turn the image into a viewable form
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

	// Method that creates an image out of the blob that is received in the http-request.
	// The aspect ratio is calculated for the image to style the image correctly based on the ratio
	createImageFromBlob(image: Blob) {
		let reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				this.profilePhoto = reader.result;
				let img = new Image();
				img.onload = () => {
					this.photoWidth = img.width;
					this.photoHeight = img.height;
					this.photoRatio = this.photoWidth / this.photoHeight;
					console.log(this.photoRatio);
				};

				img.src = this.profilePhoto;
			},
			false
		);

		if (image) {
			reader.readAsDataURL(image);
		}
	}

	// Method to sanitize the url of the profilephoto
	getSanitizedUrl(image: any) {
		return this._sanitizer.bypassSecurityTrustUrl(image);
	}
}
