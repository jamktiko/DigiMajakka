/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/comma-dangle */
import type express from 'express';

type CustomError = {
	status?: number;
} & Error;

const ErrorHandler = (
	error: CustomError,
	_request: express.Request,
	response: express.Response,
	_next: express.NextFunction
) => {
	console.log('Custom error handling');
	console.log('---------------------');
	console.error(error);

	response.status(error.status ?? 500).json({
		success: false,
		message: error.message,
	});
};

export default ErrorHandler;
