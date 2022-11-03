/* eslint-disable import/extensions */
import express from 'express';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Imports for error handlers
// import createError from 'http-errors';
// import type {ErrorRequestHandler} from 'express';

import profileRouter from './routes/profile';
import joblistingRouter from './routes/joblisting';
import userRouter from './routes/users';
import imageRouter from './routes/images';
import cityRouter from './routes/cities';
import schoolRouter from './routes/schools';
// Usage of environment varaibles
dotenv.config();

const app = express();

// Necessary middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(cookieParser());
app.use(cors());
app.use(morgan('common'));

// Take routes in use

app.use('/profiles', profileRouter);
app.use('/joblistings', joblistingRouter);
app.use('/users', userRouter);
app.use('/images', imageRouter);
app.use('/cities', cityRouter);
app.use('/schools', schoolRouter);
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
