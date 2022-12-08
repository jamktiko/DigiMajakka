import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-guide-light-entrepreneur',
	templateUrl: './guide-light-entrepreneur.component.html',
	styleUrls: ['./guide-light-entrepreneur.component.css'],
})
export class GuideLightEntrepreneurComponent implements OnInit {
	constructor() {}

	// Variables to hold breadcrumb data that is sent to breadcrumb-component
	breadcrumbColor: string = 'blue';
	breadcrumbRoute: any = [
		{name: 'Ohjeet', route: '/guide'},
		{name: 'Kevytyrittäjyys', route: '/guide/forstudent'},
	];

	ngOnInit(): void {}
}
