import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	// Service for managing logins
	// WILL BE IMPLEMENTED LATER

	// Declarations for placeholder functionality
	logged!: boolean;
	loggedUser = '';

	constructor() {}

	login(email: string, password: string) {}

	loginCallBack(): Promise<any> {
		return Promise.resolve();
	}

	// Placeholder method that sets currently logged in user as empty and sets logged-status to false.
	logout() {
		this.logged = false;
		this.loggedUser = '';
	}
}
