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
			response.status(200).json(result);
		} catch (error: unknown) {
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
};

export default userController;
