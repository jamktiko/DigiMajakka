import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JWTTokenService} from '../jwttoken.service';
import {LocalStorageService} from '../local-storage.service';
import {LoginService} from '../login.service';
import {StateManagementService} from '../state-management.service';

@Component({
	selector: 'app-recover-password',
	templateUrl: './recover-password.component.html',
	styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent implements OnInit {
	constructor(
		private loginservice: LoginService,
		private stateservice: StateManagementService
	) {}

	// Variables to hold form-values
	email: string = '';
	code!: number;
	password: string = '';
	passwordConfirm: string = '';

	// Variables to see if there were errors while resetting password
	sendError: boolean = false;
	resetError: boolean = false;
	pwError: boolean = false;
	accountNotFound: boolean = false;

	// Variable that is changed to true when a new code is sent. Used to display a message to the user
	newCodeSent: boolean = false;

	// Variables to check which form to display
	codeForm: boolean = false;

	ngOnInit(): void {}

	// Method to send the resetcode to the users email
	onSubmit(formData: any) {
		this.loginservice.sendPasswordResetCode(formData.email).subscribe(
			() => {
				// Functionality when the sending is successful
				console.log('Sent');
				this.codeForm = true;
			},
			(Error) => {
				// Error handling
				if (Error.error.message === 'User does not exist.') {
					console.log('Ei tiliä');
					this.accountNotFound = true;
					this.toggleUserNotification();
				} else {
					console.log('Error sending the reset code.');
				}
				this.sendError = true;
			}
		);
	}

	resetPasswordWithCode(formData: any) {
		if (formData.password === formData.passwordConfirm) {
			// if the new password was confirmed correctly, continue to setting new password in loginservice
			this.loginservice
				.resetPwWithCode(this.email, formData.code, formData.password)
				.subscribe(
					() => {
						// Functionality when the reset is successful
						console.log('Password reset completed');
						this.showLoginForm();
					},
					(Error) => {
						// Error handling
						console.log('Error while resetting password');
					}
				);
		} else {
			// If the new password wasn't confirmed, display an error to the user
			this.pwError = true;
		}
	}

	sendNewResetCode() {
		this.loginservice.sendPasswordResetCode('asdasd@gmail.com').subscribe(
			() => {
				this.newCodeSent = true;
			},
			(Error) => {
				if (Error.error.message === 'User does not exist.') {
					console.log('Ei tiliä');
					this.accountNotFound = true;
					this.toggleUserNotification();
				}
			}
		);
	}

	// Method that hides or displays the form
	changeVisibility() {
		this.codeForm = false;
		this.stateservice.toggleResetPasswordVisibility();
	}

	// Methods to show/hide different sections and forms
	showRegisterForm() {
		this.toggleUserNotification();
		this.changeVisibility();
		this.stateservice.toggleRegisterFormVisibility();
	}

	// Method to redirect to login form
	showLoginForm() {
		this.changeVisibility();
		this.stateservice.toggleLoginFormVisibility();
	}

	get isUserNotificationVisible(): boolean {
		return this.stateservice.userNotificationVisible;
	}

	toggleUserNotification() {
		this.stateservice.toggleUserNotificationVisibility();
	}

	// Method to reset the usernotification, so notifications aren't displayed when they are not supposed to
	resetUserNotification() {
		this.accountNotFound = false;
	}
}
