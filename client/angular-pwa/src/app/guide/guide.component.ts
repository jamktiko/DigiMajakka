import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-guide',
	templateUrl: './guide.component.html',
	styleUrls: ['./guide.component.css'],
})
export class GuideComponent implements OnInit {
	constructor() {}

	// Variables to hold breadcrumb data that is sent to breadcrumb-component
	breadcrumbColor: string = 'gray';
	breadcrumbRoute: any = [{name: 'Ohjeet', route: '/guide'}];

	ngOnInit(): void {}
}
