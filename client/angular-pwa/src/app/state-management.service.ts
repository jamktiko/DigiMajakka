import {Injectable} from '@angular/core';
import {States} from './interface';
import {Subject} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StateManagementService {
	allStates: States = {
		photo: false,
	};

	visibilityChange: Subject<boolean> = new Subject<boolean>();

	photoChange() {
		this.allStates.photo = !this.allStates.photo;
	}
	constructor() {
		this.visibilityChange.subscribe((value) => {
			this.allStates.photo = value;
		});
	}
}
