/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */

import type express from 'express';
import queryDb from '../db-connection';
import cognitoHelper from '../cognito-helper';

const userController = {
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
				'INSERT INTO Kayttaja VALUES (?,?,?);',
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
				'SELECT * FROM Kayttaja WHERE sahkoposti=?',
				[_request.body.email]
			);
			if (Array.isArray(user) && user.length > 0) {
				await queryDb('DELETE FROM Kayttaja WHERE sahkoposti=?', [
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
			const result = cognitoHelper.signIn(
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
			const result = cognitoHelper.confirmSignUp(
				_request.body.email,
				_request.body.code
			);
			response.status(200).json(result);
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default userController;
