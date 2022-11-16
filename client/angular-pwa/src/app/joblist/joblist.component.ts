import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-joblist',
	templateUrl: './joblist.component.html',
	styleUrls: ['./joblist.component.css'],
})
export class JoblistComponent implements OnInit {
	search = '';
	constructor() {}

	ngOnInit(): void {}

	onSubmit(formdata: any) {
		// ADD FUNCTIONALITY
		this.search = formdata.search;
		console.log(this.search);
	}
}
