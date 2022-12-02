import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
@Component({
	selector: 'app-privacy-policy',
	templateUrl: './privacy-policy.component.html',
	styleUrls: ['./privacy-policy.component.css'],
})
export class PrivacyPolicyComponent implements OnInit {
	// Location is used for navigating back in the app
	constructor(private location: Location) {}

	// Method that navigates to the previous route
	back(): void {
		this.location.back();
	}
	ngOnInit(): void {}
}
