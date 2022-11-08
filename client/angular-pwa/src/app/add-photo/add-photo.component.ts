import {Component, OnInit} from '@angular/core';
import {StateManagementService} from '../state-management.service';

@Component({
	selector: 'app-add-photo',
	templateUrl: './add-photo.component.html',
	styleUrls: ['./add-photo.component.css'],
})
export class AddPhotoComponent implements OnInit {
	visible: boolean;
	constructor(private editservice: StateManagementService) {
		this.visible = editservice.addPhotoEdit;
	}

	changeVisibility() {
		this.editservice.toggleContactVisibilityPhoto();
	}

	ngOnInit(): void {}
}
