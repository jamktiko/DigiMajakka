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
	logged!: boolean;
	loggedUser = this.loginService.loggedUser;

	// Variable that dictates if registration- or confirmform is displayed
	confirmForm: boolean = false;

	// users login-status is validated when the component loads
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
	logout() {
		this.loginService
			.logout(String(this.storageservice.get('user')))
			.subscribe(() => {
				this.loginService.setLoggedOutStatus();
				this.loggedUser = this.loginService.loggedUser;
				this.reloadPage();
			});
	}

	// Method that resets the confirmForm-variable to false, so the confirmation-form is not displayed when its not supposed to.
	resetConfirmForm() {
		this.confirmForm = false;
	}

	// Method that shows the confirmation-form
	showConfirmForm() {
		this.confirmForm = true;
		this.changeRegisterVisibility();
	}

	// Methods to toggle visibilities of user-forms
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

	get isPasswordResetVisible() {
		return this.stateservice.resetPasswordVisible;
	}
}
