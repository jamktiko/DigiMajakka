import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {StateManagementService} from '../state-management.service';

@Component({
	selector: 'app-student-frontpage',
	templateUrl: './student-frontpage.component.html',
	styleUrls: ['./student-frontpage.component.css'],
})
export class StudentFrontpageComponent implements OnInit {
	constructor(
		private loginService: LoginService,
		private stateservice: StateManagementService
	) {}

	// Declarations for logged-status and currently logged in user
	logged = this.loginService.logged;
	loggedUser = this.loginService.loggedUser;

	ngOnInit(): void {}

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
