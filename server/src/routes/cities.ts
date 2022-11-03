/* eslint-disable new-cap */
/* eslint-disable import/extensions */

import express from 'express';
import cityC from '../controllers/city-controller';

const cityRouter = express.Router();

cityRouter.get('/findById/:id', cityC.findById);

export default cityRouter;
