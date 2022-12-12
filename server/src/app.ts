import express from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import ErrorHandler from './middlewares/error-handler';

// Import routes from routes folder
import indexRouter from './routes/index';
import profileRouter from './routes/profiles';
import joblistingRouter from './routes/joblisting';
import userRouter from './routes/users';
import imageRouter from './routes/images';
import cityRouter from './routes/cities';
import schoolRouter from './routes/schools';
import linkRouter from './routes/links';
import skillRouter from './routes/skills';

// Usage of environment varaibles
import dotenv from 'dotenv';
dotenv.config();

// Create express app
const app = express();

// Necessary middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(cookieParser());
app.use(cors());
app.use(morgan('common'));

// Take routes in use
app.use('/', indexRouter);
app.use('/profiles', profileRouter);
app.use('/joblistings', joblistingRouter);
app.use('/users', userRouter);
app.use('/images', imageRouter);
app.use('/cities', cityRouter);
app.use('/schools', schoolRouter);
app.use('/links', linkRouter);
app.use('/skills', skillRouter);

// Take custom error handler in use
app.use(ErrorHandler);
export = app;
