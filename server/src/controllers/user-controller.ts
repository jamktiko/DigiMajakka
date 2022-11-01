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
			const result = await cognitoHelper.signUp(
				_request.body.email,
				_request.body.password
			);
			const dbresult = await queryDb(
				'INSERT INTO UserAccount VALUES (?,?,?);',
				[
					_request.body.email,
					_request.body.admin,
					_request.body.schoolid,
				]
			);
			if (result && dbresult) {
				response.status(200).json({
					message: 'Created user ' + String(result),
				});
			} else {
				throw new Error('Error when creating user');
			}
		} catch (error: unknown) {
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
};

export default userC;
