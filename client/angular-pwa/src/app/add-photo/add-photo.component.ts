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

	@Input() loggedProfile: any;

	formData = new FormData();

	onPhotoSelected(event: any) {
		this.photo = event.target.files[0];

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
