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
		private jwtservice: JWTTokenService,
		private stateservice: StateManagementService,
		private localstorageservice: LocalStorageService
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
}
