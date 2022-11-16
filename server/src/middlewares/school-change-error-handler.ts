/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */

import type express from 'express';

import CustomError from '../custom-error';
import queryDb from '../db-connection';
import CognitoHelper from '../service-helpers/cognito-helper';

const cognitoHelper = new CognitoHelper();

// If user school change fails use middleware to handle error
const handleError = async (
	error: Error,
	_request: express.Request,
	_response: express.Response,
	next: express.NextFunction
) => {
	try {
		// Check if user was updated in database
		const didUpdate = await queryDb(
			'SELECT * FROM UserAccount WHERE email = ?;',
			[_request.body.newemail]
		);
		// If user was updated in database try to create new cognito account again
		if (didUpdate.length > 0) {
			await cognitoHelper.signUp(
				_request.body.newemail,
				_request.body.password
			);

			await cognitoHelper.deleteUser(
				_request.body.newemail,
				_request.body.password
			);
		} else {
			// If user was not updated into database throw error forward to default erro handler
			next(error);
		}
	} catch (error: unknown) {
		// Return user to its original values in database
		await queryDb('CALL updateUserSchool(?, ?, ?);', [
			_request.body.newemail,
			_request.body.oldemail,
			_request.body.oldschool,
		]);
		// Log error to console
		console.error(error);
		// Create new error and throw it to default error handler
		const customerror = new CustomError(
			'Error when trying to update school. Unable to fix automatically, please contact our support via email.',
			500
		);
		next(customerror);
	}
};

export default handleError;
