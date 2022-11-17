import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-joblist',
	templateUrl: './joblist.component.html',
	styleUrls: ['./joblist.component.css'],
})
export class JoblistComponent implements OnInit {
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
