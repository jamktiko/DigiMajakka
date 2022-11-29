import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

	confirmForm: boolean = false;
	emailToConfirm: string = '';
	code!: number;

	acceptTerms: boolean = false;
	confirmError: boolean = false;

	@Output() logged = new EventEmitter();
	ngOnInit(): void {}

	// Method that hides or displays the form
	changeVisibility() {
		this.stateservice.toggleRegisterFormVisibility();
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
						console.log('Oh no: ' + Error.message);
						this.registerError = true;
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

	showLogin() {
		this.changeVisibility();
		this.stateservice.toggleLoginFormVisibility();
	}
}
