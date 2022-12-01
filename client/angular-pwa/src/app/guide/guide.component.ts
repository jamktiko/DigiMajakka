import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
	selector: 'app-guide',
	templateUrl: './guide.component.html',
	styleUrls: ['./guide.component.css'],
})
export class GuideComponent implements OnInit {
	// Location is used for navigating back in the app
	constructor(private location: Location) {}

	// Method that navigates to the previous route
	back(): void {
		this.location.back();
	}

	ngOnInit(): void {}
}
