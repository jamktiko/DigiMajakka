import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
	// Variable to dictate which color background to show
	@Input() color!: string;
	@Input() routes!: any;

	constructor(private location: Location) {}

	ngOnInit(): void {}

	// Method that navigates to the previous route
	back(): void {
		this.location.back();
	}
}
