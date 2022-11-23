import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JWTTokenService} from './jwttoken.service';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	// Service for managing logins
	// WILL BE IMPLEMENTED LATER

	// Declarations for placeholder functionality
	logged!: boolean;
	loggedUser = '';

	tokens: any;

	constructor(
		private http: HttpClient,
		private jwtservice: JWTTokenService
	) {}

	// Options for http-requests
	httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'}),
	};

	login(email: string, password: string) {
		return this.http.post(
			'http://localhost:3000/users/signin',
			`{"email": "${email}", "password": "${password}"}`,
			this.httpOptions
		);
	}

	loginCallBack(): Promise<any> {
		return Promise.resolve();
	}

	// Placeholder method that sets currently logged in user as empty and sets logged-status to false.
	logout() {
		this.logged = false;
		this.loggedUser = '';
	}
}
