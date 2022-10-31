import {Component, OnInit} from '@angular/core';
import {ProfileEditService} from '../profile-edit.service';

@Component({
	selector: 'app-edit-about-me',
	templateUrl: './edit-about-me.component.html',
	styleUrls: ['./edit-about-me.component.css'],
})
export class EditAboutMeComponent implements OnInit {
	maxChars = 600;
	aboutme = '';
	lookingfor = '';
	chars = 0;

	constructor(private editservice: ProfileEditService) {}

	ngOnInit(): void {}

	onSubmit(formdata: any) {}

	changeVisibility() {
		this.editservice.toggleAboutMeVisibility();
	}
}
