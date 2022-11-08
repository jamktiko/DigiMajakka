/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */

import type express from 'express';
import queryDb from '../db-connection';
import cognitoHelper from '../cognito-helper';

const userC = {
	// Funktion that signs user up to cognito and database
	async singUp(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			// Try to insert account information to database and save answer to dbresult
			const dbresult = await queryDb(
				'INSERT INTO UserAccount VALUES (?,?,?);',
				[
					_request.body.email,
					_request.body.admin,
					_request.body.schoolname,
				]
			);
			// Try to sign user to cognito and save ansewer to result
			const result = await cognitoHelper.signUp(
				_request.body.email,
				_request.body.password
			);

			// Check if there are result from both cognito and database
			if (result && dbresult) {
				// If everything is ok send response to frontend
				console.log('Created user ' + String(result));

				response.status(200).json({
					message: 'Created user ' + String(result),
				});
			} else {
				throw new Error('Error when creating user');
			}
		} catch (error: unknown) {
			// If there were error when creating user find if user was inserted to database and remove that user
			const user = await queryDb(
				'SELECT * FROM UserAccount WHERE email=?',
				[_request.body.email]
			);
			if (Array.isArray(user) && user.length > 0) {
				await queryDb('DELETE FROM UserAccount WHERE email=?', [
					_request.body.email,
				]);
			}

			next(error);
		}
	},
	// Function to sign registered user in
	async signIn(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const result = await cognitoHelper.signIn(
				_request.body.email,
				_request.body.password
			);
			response.status(200).json(result);
		} catch (error: unknown) {
			next(error);
		}
	},
	// Function to confirm signup with code that cognito has send to user via email
	async confirmSignup(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const result = await cognitoHelper.confirmSignUp(
				_request.body.email,
				String(_request.body.code)
			);
			response.status(200).json(result);
		} catch (error: unknown) {
			next(error);
		}
	},
	// Function to resend confirmation code
	async resendConfirmCode(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const result = await cognitoHelper.resendConfirmCode(
				_request.body.email
			);

			response.status(200).json(result);
		} catch (error: unknown) {
			next(error);
		}
	},
	// Function to sign user out
	async signOut(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const result = await cognitoHelper.signOut(_request.body.email);
			console.log(result);

			response.status(200).json({
				message: 'Signed user out successfully',
			});
		} catch (error: unknown) {
			next(error);
		}
	},
	async deleteUser(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const result = await cognitoHelper.deleteUser(
				_request.body.email,
				_request.body.password
			);
			const dbresult = queryDb('DELETE FROM UserAccount WHERE email=?', [
				_request.body.email,
			]);
			console.log('User deleted from cognito successfully');
			console.log(result);
			console.log(dbresult);

			response.status(200).json({
				message: 'Deleted user successfully',
			});
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default userC;
