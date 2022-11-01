/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
import process from 'node:process';
import {CognitoIdentityServiceProvider} from 'aws-sdk';
import type express from 'express';

const identityServiceProvider = new CognitoIdentityServiceProvider({
	region: process.env.REGION,
});

export type IUser = {
	id: string | undefined;
	email: string | undefined;
};

export type IAuthenticatedRequest = {
	user?: IUser;
	headers: {
		authorization?: string;
	};
} & express.Request;

export const authHandler = async (
	_request: IAuthenticatedRequest,
	_response: express.Response,
	next: express.NextFunction
) => {
	try {
		if (_request.headers.authorization) {
			const token = _request.headers.authorization;
			const rawUser = await identityServiceProvider
				.getUser({AccessToken: token})
				.promise();
			_request.user = {
				id: rawUser.UserAttributes.find((attr) => attr.Name === 'sub')
					?.Value,
				email: rawUser.UserAttributes.find(
					(attr) => attr.Name === 'email'
				)?.Value,
			};
			next();
		} else {
			throw new Error('No token');
		}
	} catch (error: unknown) {
		next(error);
	}
};
