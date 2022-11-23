import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root',
})
export class JWTTokenService {
	// https://www.syncfusion.com/blogs/post/best-practices-for-jwt-authentication-in-angular-apps.aspx

	// Variable that the token is stored in
	jwtToken: string = '';

	// Variable where the token is stored after decoding
	decodedToken!: {[key: string]: string};

	constructor() {}

	// Method to set the token into a variable
	setToken(token: string) {
		if (token) {
			this.jwtToken = token;
			console.log('In jwtservice setToken: ' + this.jwtToken);
		}
	}

	// Method to decode the JWT by using the jwt_decode library method
	decodeToken() {
		if (this.jwtToken) {
			this.decodedToken = jwt_decode(this.jwtToken);
		}
	}

	// Method that gets the decoded token
	getDecodedToken() {
		console.log(jwt_decode(this.jwtToken));
		return jwt_decode(this.jwtToken);
	}

	// Method to get the username from the decoded token.
	getUser() {
		this.decodeToken();
		console.log(
			'User ' + this.decodedToken
				? String(this.decodedToken.username)
				: null
		);
		return this.decodedToken ? this.decodedToken.username : null;
	}

	// Method to get the useremail from the decoded token
	// getEmailId() {
	// 	this.decodeToken();
	// 	return this.decodedToken ? this.decodedToken.email : null;
	// }

	// Method to get the time of expiration for the token
	getExpiryTime() {
		this.decodeToken();
		return this.decodedToken ? this.decodedToken.exp : null;
	}

	// Method to check if the token has expired
	isTokenExpired(): boolean {
		const expiryTime: string | null = this.getExpiryTime();
		if (expiryTime) {
			console.log(
				'Is token expired: ' +
					(1000 * parseInt(expiryTime) - new Date().getTime() < 5000)
			);
			return 1000 * parseInt(expiryTime) - new Date().getTime() < 5000;
		} else {
			return false;
		}
	}
}
