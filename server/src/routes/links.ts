/* eslint-disable new-cap */
/* eslint-disable import/extensions */

import express from 'express';
import somelinkC from '../controllers/link-controller';
import bodyChecker from '../middlewares/body-check';

const somelinkRouter = express.Router();

// Get links by profileid
// /links/:profileid
somelinkRouter.get('/:profileid', somelinkC.findById);

// Add new link for profile
somelinkRouter.post('/', bodyChecker, somelinkC.addLink);

export default somelinkRouter;
