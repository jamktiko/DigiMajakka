import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {StateManagementService} from '../state-management.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
	selector: 'app-student-frontpage',
	templateUrl: './student-frontpage.component.html',
	styleUrls: ['./student-frontpage.component.css'],
})
export class StudentFrontpageComponent implements OnInit {
	constructor(
		private loginService: LoginService,
		private stateservice: StateManagementService,
		private storageservice: LocalStorageService
	) {}

	// Declarations for logged-status and currently logged in user
	logged = this.stateservice.loggedIn;
	loggedUser = this.loginService.loggedUser;

	ngOnInit(): void {
		this.getLoggedInStatus();
	}

	getLoggedInStatus() {
		if (this.storageservice.get('loggedIn') === 'true') {
			return true;
		} else {
			return false;
		}
	}

	// Placeholder method to logout
	logout() {
		this.loginService.logout();
		this.logged = this.loginService.logged;
		this.loggedUser = this.loginService.loggedUser;
	}

	// Methods to toggle visibilities of profile edit-forms
	get isLoginVisible(): boolean {
		return this.stateservice.loginFormVisible;
	}

	changeLoginVisibility() {
		this.stateservice.toggleLoginFormVisibility();
	}
}
