import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JWTTokenService} from './jwttoken.service';
import {LocalStorageService} from './local-storage.service';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	// Service for managing logins
	// WILL BE IMPLEMENTED LATER

	// Declarations for placeholder functionality
	loggedUser = '';

	private loginUrl = 'http://localhost:3000/users/signin';
	private registerUrl = 'http://localhost:3000/users/signup';
	private confirmUrl = 'http://localhost:3000/users/confirm';
	private resendCodeUrl = 'http://localhost:3000/users/resend';
	private sendPwResetUrl = 'http://localhost:3000/users/reset/sendcode';
	private confirmPwResetUrl = 'http://localhost:3000/users/reset/confirm';

	tokens: any;

	constructor(
		private http: HttpClient,
		private jwtservice: JWTTokenService,
		private localstorageservice: LocalStorageService
	) {}

	// Options for http-requests
	httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'}),
	};

	// Method that logs the user in. Returns the authorization token
	login(email: string, password: string) {
		return this.http.post(
			this.loginUrl,
			`{"email": "${email}", "password": "${password}"}`,
			this.httpOptions
		);
	}

	// Method to register a new user to the service
	register(email: string, password: string) {
		return this.http.post(
			this.registerUrl,
			`{"email": "${email}", "password": "${password}"}`,
			this.httpOptions
		);
	}

	// Method to confirm a new account with the code sent to email
	confirmAccount(email: string, code: number) {
		return this.http.post(
			this.confirmUrl,
			`{"email": "${email}", "code": "${code}"}`,
			this.httpOptions
		);
	}

	// MEthod to resend the account confirmation code to users email
	resendConfirmationCode(email: string) {
		return this.http.post(
			this.resendCodeUrl,
			`{"email": "${email}"}`,
			this.httpOptions
		);
	}

	// Method to send a password reset code to users email
	sendPasswordResetCode(email: string) {
		return this.http.post(
			this.sendPwResetUrl,
			`{"email": "${email}"}`,
			this.httpOptions
		);
	}

	// Method to confirm the password reset with th code sent to users email
	resetPwWithCode(email: string, code: number, newPassword: string) {
		return this.http.post(
			this.confirmPwResetUrl,
			`{"email": "${email}", "confirmationCode": "${code}", "newPassword": "${newPassword}"}`,
			this.httpOptions
		);
	}

	// Placeholder method that sets currently logged in user as empty and sets logged-status to false.
	async logout() {
		this.localstorageservice.remove('token');
		this.localstorageservice.remove('loggedIn');
		this.loggedUser = '';
	}

	// Method that checks if the user is logged in and the jwt token hasn't expired
	validateLoginStatus(): boolean {
		if (this.localstorageservice.get('token')) {
			if (
				!this.jwtservice.isTokenExpired(
					String(this.localstorageservice.get('token'))
				) &&
				this.localstorageservice.get('loggedIn') === 'true'
			) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
