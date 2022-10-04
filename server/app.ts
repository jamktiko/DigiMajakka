import express from 'express';
import cookieParser from 'cookie-parser';
// Imports for error handlers
// import createError from 'http-errors';
// import type {ErrorRequestHandler} from 'express';

import indexRouter from './routes/index.js';

const app = express();

// Necessary middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);
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
