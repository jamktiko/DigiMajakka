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

	email: string = '';

	resetError: boolean = false;

	ngOnInit(): void {}

	// Method that hides or displays the form
	changeVisibility() {
		this.stateservice.toggleLoginFormVisibility();
	}

	onSubmit(formData: any) {
		this.loginservice.resetPassword(formData.email).subscribe(
			() => {
				console.log('Sent');
			},
			(Error) => {
				console.log('Error sending the reset code.');
				this.resetError = true;
			}
		);
	}

	showRegisterForm() {
		this.changeVisibility();
		this.stateservice.toggleRegisterFormVisibility();
	}
}
