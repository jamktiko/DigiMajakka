import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Imports for error handlers
// import createError from 'http-errors';
// import type {ErrorRequestHandler} from 'express';

import profileRouter from './routes/profile.js';
// Usage of environment varaibles
dotenv.config();

const app = express();

// Necessary middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

// Take routes in use

app.use('/profiles', profileRouter);
// Error handling code created by express generator
// TBD if we use it or our own error handler
// app.use((request, response, next) => {
// 	next(createError(404));
// });

// const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
// 	response.locals.message = error.message;
// 	response.locals.error =
// 		request.app.get('env') === 'development' ? error : {};

// 	// Render the error page
// 	response.status(error.status || 500);
// 	response.render('error');
// };

// app.use(errorHandler);

export = app;
