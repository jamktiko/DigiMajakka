import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
	selector: 'app-terms-and-conditions',
	templateUrl: './terms-and-conditions.component.html',
	styleUrls: ['./terms-and-conditions.component.css'],
})
export class TermsAndConditionsComponent implements OnInit {
	// Location is used for navigating back in the app
	constructor(private location: Location) {}

	// Method that navigates to the previous route
	back(): void {
		this.location.back();
	}
	ngOnInit(): void {}
}
