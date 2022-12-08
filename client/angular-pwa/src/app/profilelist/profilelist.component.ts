import {Component, OnInit} from '@angular/core';
import {ProfilesService} from '../profiles.service';

@Component({
	selector: 'app-profilelist',
	templateUrl: './profilelist.component.html',
	styleUrls: ['./profilelist.component.css'],
})
export class ProfilelistComponent implements OnInit {
	constructor(private profileService: ProfilesService) {}

	// All the profiles will be in this array
	profiles: any = [];

	// Search-input variable
	search: string = '';

	// Get all profiles when the component is created
	ngOnInit(): void {
		this.getProfiles();
	}

	// Method to get all profiles from the database by calling the getProfiles()- method in profileservice
	getProfiles(): void {
		this.profileService
			.getProfiles()
			.subscribe((profiles) => (this.profiles = profiles));
	}
}
