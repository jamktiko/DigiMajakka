/* eslint-disable new-cap */

import express from 'express';
import schoolC from '../controllers/school-controller';

const schoolRouter = express.Router();

// Route to get school by name
// /schools/:name
schoolRouter.get('/:name', schoolC.findByName);

// Route to get all schools
// /schools/
schoolRouter.get('/', schoolC.findAll);

export default schoolRouter;
