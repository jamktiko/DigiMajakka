/* eslint-disable import/extensions */
import express from 'express';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Import routes from routes folder
import profileRouter from './routes/profile';
import joblistingRouter from './routes/joblisting';
import userRouter from './routes/users';
import imageRouter from './routes/images';
import cityRouter from './routes/cities';
import schoolRouter from './routes/schools';
import somelinkRouter from './routes/links';
// Usage of environment varaibles
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
app.use('/profiles', profileRouter);
app.use('/joblistings', joblistingRouter);
app.use('/users', userRouter);
app.use('/images', imageRouter);
app.use('/cities', cityRouter);
app.use('/schools', schoolRouter);
app.use('/links', somelinkRouter);

export = app;
