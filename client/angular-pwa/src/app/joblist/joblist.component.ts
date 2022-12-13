import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-joblist',
	templateUrl: './joblist.component.html',
	styleUrls: ['./joblist.component.css'],
})
export class JoblistComponent implements OnInit {
	breadcrumbColor: string = 'gray';
	breadcrumbRoute: any = [
		{name: 'Opiskelijalle', route: '/student'},
		{name: 'Työpaikat', route: '/student/joblist'},
		{name: 'Työilmoitus', route: 'LISÄÄ TÄHÄN REITTI'},
	];
	infoSearch = {
		engine: '',
	};

	constructor() {}

	ngOnInit(): void {}

	onSubmit(formdata: any) {
		// ADD FUNCTIONALITY
		this.infoSearch.engine = formdata.infoSearch.engine;
		console.log(this.infoSearch.engine);
	}
}
