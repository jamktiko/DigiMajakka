import process from 'node:process';
import {CognitoIdentityServiceProvider} from 'aws-sdk';
import type express from 'express';

// Cognito service
const identityServiceProvider = new CognitoIdentityServiceProvider({
  region: process.env.REGION,
});

// Type for user attribute to use in request
export type IUser = {
  id: string | undefined;
  email: string | undefined;
};

// Extended Request type providing user attribute and authorization header
export type IAuthenticatedRequest = {
  user?: IUser;
  headers: {
    authorization?: string;
  };
} & express.Request;

/**
 * Checks that there is token and places users information from decoded token to requests user attribute
 * @param  {IAuthenticatedRequest} _request  express request
 * @param {express.Response} _response express response
 * @param {express.NextFunction} next express next function
 */
export const authHandler = async (
  _request: IAuthenticatedRequest,
  _response: express.Response,
  next: express.NextFunction,
) => {
  try {
    // Check that there is authorization header
    if (_request.headers.authorization) {
      const token = _request.headers.authorization;

      const rawUser = await identityServiceProvider
        .getUser({AccessToken: token})
        .promise();
      // Place token adn email to requests user attribute
      _request.user = {
        id: rawUser.UserAttributes.find((attr) => attr.Name === 'sub')?.Value,
        email: rawUser.UserAttributes.find((attr) => attr.Name === 'username')
          ?.Value,
      };
      next();
    } else {
      throw new Error('No token');
    }
  } catch (error: unknown) {
    next(error);
  }
};
