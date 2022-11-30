import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from '../login.service';
import {JWTTokenService} from '../jwttoken.service';
import {StateManagementService} from '../state-management.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	constructor(
		private loginservice: LoginService,
		private jwtservice: JWTTokenService,
		private stateservice: StateManagementService,
		private localstorageservice: LocalStorageService
	) {}

	email: string = '';
	password: string = '';
	tokens: any;

	loginError: boolean = false;

	accountNotFound: boolean = false;
	accountNotConfirmed: boolean = false;

	@Output() logged = new EventEmitter();
	@Output() confirm = new EventEmitter();

	ngOnInit(): void {}

	ngOnDestroy() {}

	// Method that hides or displays the form
	changeVisibility() {
		this.stateservice.toggleLoginFormVisibility();
	}

	onSubmit(formData: any) {
		console.log(formData.email + formData.password);
		this.loginservice.login(formData.email, formData.password).subscribe(
			(tokens) => {
				this.tokens = tokens;
				this.jwtservice.setToken(this.tokens.accessToken);
				this.jwtservice.getDecodedToken();
				this.localstorageservice.set('token', this.tokens.accessToken);
				this.localstorageservice.set('loggedIn', 'true');
				this.changeVisibility();
				this.logged.emit();
			},
			(Error) => {
				console.log(
					'Kirjautumiserrori' + JSON.stringify(Error.error.message)
				);
				this.loginError = true;
				if (Error.error.message === 'Incorrect username or password.') {
					this.accountNotFound = true;
					this.toggleUserNotification();
				} else if (Error.error.message === 'User is not confirmed.') {
					this.accountNotConfirmed = true;
					this.toggleUserNotification();
				}
			}
		);
	}

	resetUserNotification() {
		this.accountNotConfirmed = false;
		this.accountNotFound = false;
	}

	showRegisterForm() {
		this.toggleUserNotification();
		this.changeVisibility();
		this.stateservice.toggleRegisterFormVisibility();
	}

	showConfirmForm() {
		this.confirm.emit();
		this.toggleUserNotification();
		this.changeVisibility();
	}

	showPwReset() {
		this.changeVisibility();
		this.stateservice.toggleResetPasswordVisibility();
	}

	get isUserNotificationVisible(): boolean {
		return this.stateservice.userNotificationVisible;
	}

	toggleUserNotification() {
		this.stateservice.toggleUserNotificationVisibility();
	}
}
