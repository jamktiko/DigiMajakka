import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ProfileEditService} from '../profile-edit.service';
import {StateManagementService} from '../state-management.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
	constructor(
		private editservice: ProfileEditService,
		private stateservice: StateManagementService
	) {}

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

	ngOnInit(): void {}
}
