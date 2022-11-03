/* eslint-disable new-cap */
/* eslint-disable import/extensions */

import express from 'express';
import schoolC from '../controllers/school-controller';

const schoolRouter = express.Router();

// Route to get school by id
schoolRouter.get('/findById/:id', schoolC.findById);

export default schoolRouter;
