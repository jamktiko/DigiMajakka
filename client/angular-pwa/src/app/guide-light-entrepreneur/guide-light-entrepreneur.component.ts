import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
	selector: 'app-guide-light-entrepreneur',
	templateUrl: './guide-light-entrepreneur.component.html',
	styleUrls: ['./guide-light-entrepreneur.component.css'],
})
export class GuideLightEntrepreneurComponent implements OnInit {
	// Location is used for navigating back in the app
	constructor(private location: Location) {}

	// Method that navigates to the previous route
	back(): void {
		this.location.back();
	}
	ngOnInit(): void {}
}
