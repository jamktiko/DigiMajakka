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

	// Variable to hold form-value
	email: string = '';

	// Variable to see if there was an error while sending the resetcode
	resetError: boolean = false;

	ngOnInit(): void {}

	// Method to send the resetcode to the users email
	onSubmit(formData: any) {
		this.loginservice.resetPassword(formData.email).subscribe(
			() => {
				// Functionality when the sending is successful
				console.log('Sent');
			},
			(Error) => {
				// Error handling
				console.log('Error sending the reset code.');
				this.resetError = true;
			}
		);
	}

	// Method that hides or displays the form
	changeVisibility() {
		this.stateservice.toggleLoginFormVisibility();
	}

	// Method to redirect to registration form
	showRegisterForm() {
		this.changeVisibility();
		this.stateservice.toggleRegisterFormVisibility();
	}
}
