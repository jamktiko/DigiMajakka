import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-privacy-policy',
	templateUrl: './privacy-policy.component.html',
	styleUrls: ['./privacy-policy.component.css'],
})
export class PrivacyPolicyComponent implements OnInit {
	// Variables to hold breadcrumb data that is sent to breadcrumb-component
	breadcrumbColor: string = 'blue';
	breadcrumbRoute: any = [
		{name: 'Tietosuojaseloste', route: '/privacypolicy'},
	];

	constructor() {}

	ngOnInit(): void {}
}
