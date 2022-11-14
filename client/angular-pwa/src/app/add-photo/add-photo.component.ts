import {Component, Input, OnInit} from '@angular/core';
import {StateManagementService} from '../state-management.service';
import {ProfilesService} from '../profiles.service';

@Component({
	selector: 'app-add-photo',
	templateUrl: './add-photo.component.html',
	styleUrls: ['./add-photo.component.css'],
})
export class AddPhotoComponent implements OnInit {
	constructor(
		private stateservice: StateManagementService,
		private profileservice: ProfilesService
	) {}

	photo: any;
	photoName: string = '';
	previewPhoto!: any;
	previewRatio: any;
	photoWidth: any;
	photoHeight: any;

	@Input() loggedProfile: any;

	formData = new FormData();

	onPhotoSelected(event: any) {
		this.photo = event.target.files[0];

		const reader = new FileReader();
		reader.onload = (e) => {
			this.previewPhoto = reader.result;
			let img = new Image();
			img.onload = () => {
				this.photoWidth = img.width;
				this.photoHeight = img.height;
				this.previewRatio = this.photoWidth / this.photoHeight;
				console.log(this.previewRatio);
			};

			img.src = this.previewPhoto;
		};

		reader.readAsDataURL(this.photo);

		if (this.photo) {
			this.photoName = this.photo.name;
			this.formData.append('image', this.photo);
		}
	}

	onSubmit() {
		this.profileservice.uploadProfilePhoto(
			this.loggedProfile[0].userprofileid,
			this.formData
		);
	}

	ngOnInit(): void {}

	changeVisibility() {
		this.stateservice.toggleContactVisibilityPhoto();
	}
}
