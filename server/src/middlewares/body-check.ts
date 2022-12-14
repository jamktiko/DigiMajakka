/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
import type express from 'express';

/**
 * Middleware to check that there are no null or undefined values in requests body
 * @param {express.Request} _request express request
 * @param {express.Response} _response express response
 * @param {express.NextFunction} next express nextfunction
 */
const bodyChecker = (
  _request: express.Request,
  _response: express.Response,
  next: express.NextFunction,
) => {
  try {
    const values = Object.values(_request.body);

    if (
      values.includes(undefined) ||
      values.includes(null) ||
      values.includes('undefined') ||
      values.includes('null')
    ) {
      throw new Error('Undefined or null values in body');
    } else {
      next();
    }
  } catch (error: unknown) {
    next(error);
  }
};

export default bodyChecker;
