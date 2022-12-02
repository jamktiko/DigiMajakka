import {Component, Input, OnInit} from '@angular/core';
import {ProfilesService} from '../profiles.service';

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

	constructor(private profileservice: ProfilesService) {}

	ngOnInit(): void {
		this.getProfileSkills(this.profile.userprofileid);
	}

	// Method that calls profileservive-method to get skills of the currently logged in profile.
	// Also sets specialskill and field of skill into their own arrays. Then removes duplicates from the field-array
	getProfileSkills(profileid: number): void {
		this.profileservice.getProfileSkills(profileid).subscribe((skills) => {
			this.skills = skills;
		});
	}
}
