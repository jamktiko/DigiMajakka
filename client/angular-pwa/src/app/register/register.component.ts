import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JWTTokenService} from '../jwttoken.service';
import {LocalStorageService} from '../local-storage.service';
import {LoginService} from '../login.service';
import {StateManagementService} from '../state-management.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
	constructor(
		private loginservice: LoginService,
		private stateservice: StateManagementService
	) {}

	email: string = '';
	password: string = '';
	passwordconfirm: string = '';
	tokens: any;

	pwError: boolean = false;
	registerError: boolean = false;

	emailToConfirm: string = '';
	code!: number;

	acceptTerms: boolean = false;
	confirmError: boolean = false;

	accountAlreadyExists: boolean = false;

	@Input() confirmForm!: boolean;
	@Output() logged = new EventEmitter();
	@Output() resetConfirmForm = new EventEmitter();

	ngOnInit(): void {}

	// Method that hides or displays the form
	changeVisibility() {
		this.stateservice.toggleRegisterFormVisibility();
		this.resetConfirmForm.emit();
	}

	onSubmit(formData: any) {
		if (formData.password === formData.passwordconfirm) {
			console.log(formData.email + ' ' + formData.password);
			this.loginservice
				.register(formData.email, formData.password)
				.subscribe(
					() => {
						console.log('Registered');
						this.emailToConfirm = formData.email;
						this.confirmForm = true;
					},
					(Error) => {
						if (
							Error.error.message ===
							'An account with the given email already exists.'
						) {
							console.log(Error.error.message);
							this.accountAlreadyExists = true;
							this.toggleUserNotification();
						} else {
							console.log(
								'Error in registration: ' + Error.error.message
							);
							this.registerError = true;
						}
					}
				);
		} else {
			console.log(
				'Salasanat ei täsmää: ' +
					formData.password +
					'' +
					formData.passwordconfirm
			);
			this.pwError = true;
		}
	}

	confirmAccount(formData: any) {
		this.loginservice
			.confirmAccount(this.emailToConfirm, formData.code)
			.subscribe(
				() => {
					console.log('Confirmed');
					this.changeVisibility();
				},
				(Error) => {
					this.confirmError = true;
					console.log('Error in confirmation');
				}
			);
	}

	resendCode() {
		this.loginservice.resendConfirmationCode(this.emailToConfirm).subscribe(
			() => {
				console.log('New code sent');
			},
			(Error) => {
				console.log('Virhe uuden koodin lähettämisessä');
			}
		);
	}

	resetUserNotification() {
		this.accountAlreadyExists = false;
	}

	showLogin() {
		this.changeVisibility();
		this.stateservice.toggleLoginFormVisibility();
	}

	showConfirmForm() {
		this.toggleUserNotification();
		this.accountAlreadyExists = false;
		this.confirmForm = true;
	}

	get isUserNotificationVisible(): boolean {
		return this.stateservice.userNotificationVisible;
	}

	toggleUserNotification() {
		this.stateservice.toggleUserNotificationVisibility();
	}
}
