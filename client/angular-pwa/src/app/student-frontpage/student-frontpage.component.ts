import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {StateManagementService} from '../state-management.service';
import {LocalStorageService} from '../local-storage.service';
import {JWTTokenService} from '../jwttoken.service';
import {ThrowStmt} from '@angular/compiler';

@Component({
	selector: 'app-student-frontpage',
	templateUrl: './student-frontpage.component.html',
	styleUrls: ['./student-frontpage.component.css'],
})
export class StudentFrontpageComponent implements OnInit {
	constructor(
		private loginService: LoginService,
		private stateservice: StateManagementService,
		private storageservice: LocalStorageService,
		private jwtservice: JWTTokenService
	) {}

	// Declarations for logged-status and currently logged in user
	logged!: boolean;
	loggedUser = this.loginService.loggedUser;

	ngOnInit(): void {
		if (this.loginService.validateLoginStatus()) {
			this.logged = true;
		} else {
			this.logged = false;
		}
	}

	// Method that reloads the window, to get updated values after updates to profile
	reloadPage(): void {
		window.location.reload();
	}

	// Placeholder method to logout
	async logout() {
		await this.loginService.logout();
		this.loggedUser = this.loginService.loggedUser;
		this.reloadPage();
	}

	// Methods to toggle visibilities of profile edit-forms
	get isLoginVisible(): boolean {
		return this.stateservice.loginFormVisible;
	}

	changeLoginVisibility() {
		this.stateservice.toggleLoginFormVisibility();
	}

	get isRegisterVisible(): boolean {
		return this.stateservice.registerFormVisible;
	}

	changeRegisterVisibility() {
		this.stateservice.toggleRegisterFormVisibility();
	}
}
