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
			'http://localhost:3000/users/signin',
			`{"email": "${email}", "password": "${password}"}`,
			this.httpOptions
		);
	}

	// Method to register a new user to the service
	register() {}

	// Placeholder method that sets currently logged in user as empty and sets logged-status to false.
	async logout() {
		this.localstorageservice.remove('token');
		this.localstorageservice.remove('loggedIn');
		this.loggedUser = '';
	}

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

	loginCallBack(): Promise<any> {
		return Promise.resolve();
	}
}
