/* eslint-disable new-cap */
/* eslint-disable import/extensions */

import express from 'express';
import somelinkC from '../controllers/link-controller';
import bodyChecker from '../middlewares/body-check';

const somelinkRouter = express.Router();

somelinkRouter.get('/:profileid', somelinkC.findById);

somelinkRouter.post('/', bodyChecker, somelinkC.addLink);

export default somelinkRouter;
