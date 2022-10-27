/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable operator-linebreak */

/* eslint-disable @typescript-eslint/naming-convention */
import process from 'node:process';
// Import 'cross-fetch/polyfill'

import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserAttribute,
	CognitoUserPool,
} from 'amazon-cognito-identity-js';

import * as dotenv from 'dotenv';

dotenv.config();

const userPool = new CognitoUserPool({
	UserPoolId: process.env.USER_POOL_ID ?? '',
	ClientId: process.env.CLIENT_ID ?? '',
});

/**
 *
 * @param email users email
 * @param profileid users id in database
 * @returns attributelist that is needed for cognito signup
 */
const createAttributeList = (email: string) => [
	new CognitoUserAttribute({
		Name: 'email',
		Value: email,
	}),
	// New CognitoUserAttribute({
	// 	Name: 'profileid',
	// 	Value: String(profileid),
	// })
];
const cognitoHelper = {
	// Function that sings new user up to cognito
	async signUp(email: string, password: string) {
		// Create attributelist for signup function
		return new Promise((resolve, reject) => {
			const attributeList: CognitoUserAttribute[] =
				createAttributeList(email);
			// Signup user to cognito
			userPool.signUp(
				email,
				password,
				attributeList,
				[],
				(error, result) => {
					if (error) {
						reject(error);
					}

					// If signup was succesfull return username
					resolve(result?.user.getUsername());
				}
			);
		});
	},
	// Function that confirms users signup with code sent to user
	async confirmSignUp(email: string, code: string) {
		// Create new instance of CognitoUser
		return new Promise((resolve, reject) => {
			const cognitoUser = new CognitoUser({
				Username: email,
				Pool: userPool,
			});

			// Use class method to verify confirmation code
			cognitoUser.confirmRegistration(code, true, (error, result) => {
				if (error) {
					reject(error);
				}

				resolve(JSON.stringify(result));
			});
		});
	},
	// Function to resend confiramtion code to user
	async resendConfirmCode(email: string) {
		// Create new instance of CognitoUser

		return new Promise((resolve, reject) => {
			const cognitoUser = new CognitoUser({
				Username: email,
				Pool: userPool,
			});

			// Use class method to resend confirmation code
			cognitoUser.resendConfirmationCode((error, result) => {
				if (error) {
					reject(error);
				}

				resolve(JSON.stringify(result));
			});
		});
	},
	async signIn(email: string, password: string) {
		return new Promise((resolve, reject) => {
			const cognitoUser = new CognitoUser({
				Username: email,
				Pool: userPool,
			});

			const authenticationDetails = new AuthenticationDetails({
				Username: email,
				Password: password,
			});

			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess(session, userConfirmationNecessary) {
					if (userConfirmationNecessary) {
						resolve({userConfirmationNecessary});
					}

					resolve({
						accessToken: session.getAccessToken().getJwtToken(),
						refreshToken: session.getRefreshToken().getToken(),
					});
				},
				onFailure(error) {
					reject(error);
				},
			});
		});
	},
	async signOut(email: string) {
		return new Promise((resolve, reject) => {
			const cognitoUser = new CognitoUser({
				Username: email,
				Pool: userPool,
			});

			cognitoUser.signOut(() => {
				resolve('Signed out successfully');
			});
		});
	},
};

export default cognitoHelper;
