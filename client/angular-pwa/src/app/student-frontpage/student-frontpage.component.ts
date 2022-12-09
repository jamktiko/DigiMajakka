import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {StateManagementService} from '../state-management.service';
import {LocalStorageService} from '../local-storage.service';
import {ProfilesService} from '../profiles.service';
import {Route, Router} from '@angular/router';

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
		private profileservice: ProfilesService,
		private router: Router
	) {}

	// Declarations for logged-status and currently logged in user
	logged!: boolean;
	loggedUser = this.loginService.loggedUser;

	// Variable that dictates if registration- or confirmform is displayed
	confirmForm: boolean = false;

	profileNotFound: boolean = false;

	// Breadcrumb data
	breadcrumbColor: string = 'gray';
	breadcrumbRoute: any = [{name: 'Opiskelijalle', route: '/student'}];

	// users login-status is validated when the component loads
	ngOnInit(): void {
		if (this.loginService.validateLoginStatus()) {
			this.logged = true;
		} else {
			this.logged = false;
		}

		if (this.logged) {
			this.breadcrumbColor = 'blue';
		} else {
			this.breadcrumbColor = 'gray';
		}
	}

	// Method that reloads the window, to get updated values after updates to profile
	reloadPage(): void {
		window.location.reload();
	}

	checkIfProfileExists() {
		this.profileservice.getLoggedInProfile().subscribe(
			() => {
				this.router.navigateByUrl('/student/profile');
			},
			(Error) => {
				if (
					Error.error.message === 'No profile found with given email'
				) {
					this.profileNotFound = true;
				} else {
					console.log(
						'Error while checking if profile exists: ' +
							Error.error.message
					);
				}
			}
		);
	}

	createProfile() {
		this.profileservice
			.createProfile(String(this.storageservice.get('user')))
			.subscribe(
				() => {
					console.log('Profile created succesfully');
					this.router.navigateByUrl('/student/profile');
				},
				(Error) => {
					console.log(
						'Error while creating profile: ' + Error.error.message
					);
				}
			);
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

	// Method to reset the user-notification, so the wrong notification is not shown
	resetUserNotification() {
		this.profileNotFound = false;
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
