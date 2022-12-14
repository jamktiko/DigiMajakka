/* eslint-disable @typescript-eslint/no-unused-vars */
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
  _next: express.NextFunction,
) => {
  console.log('Error handler');

  console.log('-------------');

  console.error(error.message);
  console.error(error.stack);

  const statusCode = Number(error.status) || 500;

  response.status(statusCode).json({
    success: false,
    message: error.message,
  });
};

export default ErrorHandler;
