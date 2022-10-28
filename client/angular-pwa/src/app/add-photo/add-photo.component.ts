import {Component, OnInit} from '@angular/core';
import {ProfileEditService} from '../profile-edit.service';

@Component({
	selector: 'app-add-photo',
	templateUrl: './add-photo.component.html',
	styleUrls: ['./add-photo.component.css'],
})
export class AddPhotoComponent implements OnInit {
	visible: boolean;
	constructor(private editservice: ProfileEditService) {
		this.visible = editservice.addPhotoEdit;
	}

	changeVisibilityPhoto() {
		this.editservice.toggleContactVisibilityPhoto();
	}

	ngOnInit(): void {}
}
