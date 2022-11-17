import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-un-saved-changes',
	templateUrl: './un-saved-changes.component.html',
	styleUrls: ['./un-saved-changes.component.css'],
})
export class UnSavedChangesComponent implements OnInit {
	@Output() save = new EventEmitter();

	@Output() cancel = new EventEmitter();

	saveProfile() {
		this.save.emit();
	}

	cancelEdit() {
		this.cancel.emit();
	}

	constructor() {}

	ngOnInit(): void {}
}
