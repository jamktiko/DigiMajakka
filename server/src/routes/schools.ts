/* eslint-disable new-cap */
/* eslint-disable import/extensions */

import express from 'express';
import schoolC from '../controllers/school-controller';

const schoolRouter = express.Router();

// Route to get school by id
// /schools/findById/:name
schoolRouter.get('/findByName/:name', schoolC.findByName);

// Route to get all schools
// /schools/findAll
schoolRouter.get('/findAll', schoolC.findAll);

export default schoolRouter;
