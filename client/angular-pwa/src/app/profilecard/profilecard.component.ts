import {Component, Input, OnInit} from '@angular/core';
import {ProfilesService} from '../profiles.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
	selector: 'app-profilecard',
	templateUrl: './profilecard.component.html',
	styleUrls: ['./profilecard.component.css'],
})
export class ProfilecardComponent implements OnInit {
	// The profile will come from the parent component
	@Input() profile!: any;

	// All skills of the profile will be in this array
	skills: any = [];

	profilePhoto: any;
	isProfilePhotoLoading: boolean = false;

	photoRatio: any;
	photoWidth: any;
	photoHeight: any;

	constructor(
		private profileservice: ProfilesService,
		private _sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		this.getProfileSkills(this.profile.userprofileid);
		this.getProfilePhoto(this.profile.userprofileid);
	}

	// Method that calls profileservive-method to get skills of the currently logged in profile.
	// Also sets specialskill and field of skill into their own arrays. Then removes duplicates from the field-array
	getProfileSkills(profileid: number): void {
		this.profileservice.getProfileSkills(profileid).subscribe((skills) => {
			this.skills = skills;
		});
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

	// Method to sanitize the url of the profilephoto
	getSanitizedUrl(image: any) {
		return this._sanitizer.bypassSecurityTrustUrl(image);
	}
}
