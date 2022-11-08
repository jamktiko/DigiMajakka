/* eslint-disable new-cap */
/* eslint-disable import/extensions */

import express from 'express';
import cityC from '../controllers/city-controller';

const cityRouter = express.Router();

cityRouter.get('/findById/:id', cityC.findById);

// Route to get all cities
// /cities/findAll
cityRouter.get('/findAll', cityC.findAll);

export default cityRouter;
