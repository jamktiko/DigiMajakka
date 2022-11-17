import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root',
})
export class JWTTokenService {
	// https://www.syncfusion.com/blogs/post/best-practices-for-jwt-authentication-in-angular-apps.aspx

	// Variable that the token is stored in
	jwtToken!: string;

	// Variable where the token is stored after decoding
	decodedToken!: {[key: string]: string};

	constructor() {}

	// Method to set the token into a variable
	setToken(token: string) {
		if (token) {
			this.jwtToken = token;
		}
	}

	// Method to decode the JWT by using the jwt_decode libraby method
	decodeToken() {
		if (this.jwtToken) {
			this.decodeToken = jwt_decode(this.jwtToken);
		}
	}

	// Method that gets the decoded token
	getDecodeToken() {
		return jwt_decode(this.jwtToken);
	}

	// Method to get the username from the decoded token.
	// MAYBE NOT NEEDED, SINCE WE DON'T HAVE A USERNAME??
	getUser() {
		this.decodeToken();
		return this.decodedToken ? this.decodedToken.displayname : null;
	}

	// Method to get the useremail from the decoded token
	getEmailId() {
		this.decodeToken();
		return this.decodedToken ? this.decodedToken.email : null;
	}

	// Method to get the time of expiration for the token
	getExpiryTime() {
		this.decodeToken();
		return this.decodedToken ? this.decodedToken.exp : null;
	}

	// Method to check if the token has expired
	isTokenExpired(): boolean {
		const expiryTime: string | null = this.getExpiryTime();
		if (expiryTime) {
			return 1000 * parseInt(expiryTime) - new Date().getTime() < 5000;
		} else {
			return false;
		}
	}
}
