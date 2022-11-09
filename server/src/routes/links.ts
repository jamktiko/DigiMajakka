/* eslint-disable new-cap */
/* eslint-disable import/extensions */

import express from 'express';
import somelinkC from '../controllers/link-controller';

const somelinkRouter = express.Router();

somelinkRouter.get('/:profileid', somelinkC.findById);

somelinkRouter.post('/', somelinkC.addLink);

export default somelinkRouter;
