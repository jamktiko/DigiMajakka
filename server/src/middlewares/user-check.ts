import type express from 'express';
import querydb from '../db-connection';

import type {IAuthenticatedRequest} from './auth';

/**
 * Function that checks that authenticated user is same user marked in data it is trying to access (id's are same)
 * @param {IAuthenticatedRequest} _request request containing token information
 * @param {express.Response} _response express response
 * @param {express.NextFunction} next express next function
 */
const checkUser = async (
  _request: IAuthenticatedRequest,
  _response: express.Response,
  next: express.NextFunction,
) => {
  try {
    if (_request.user) {
      const user = await querydb(
        'SELECT * FROM UserProfile WHERE UserAccount_email = ?;',
        [_request.user.email],
      );

      if (user[0].userprofileid === _request.params.id) {
        next();
      } else {
        throw new Error('Authorization failed');
      }
    }
  } catch (error: unknown) {
    next(error);
  }
};

export default checkUser;
