/* eslint-disable new-cap */
/* eslint-disable import/extensions */

import express from 'express';
import cityC from '../controllers/city-controller';

const cityRouter = express.Router();

// Route to find city by name
// /cities/name/:name
cityRouter.get('/name/:name', cityC.findByName);

// Route to get all cities
// /cities/
cityRouter.get('/', cityC.findAll);

export default cityRouter;
