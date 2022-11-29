import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	// https://www.syncfusion.com/blogs/post/best-practices-for-jwt-authentication-in-angular-apps.aspx
	// Service that manages localstorage
	constructor() {}

	// Method to set data into localstorage
	set(key: string, value: string) {
		localStorage.setItem(key, value);
	}

	// Method to get data from localstorage by its key
	get(key: string) {
		return localStorage.getItem(key);
	}

	// Method to remove an item from localstorage
	remove(key: string) {
		localStorage.removeItem(key);
	}
}
