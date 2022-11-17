/* eslint-disable new-cap */

import express from 'express';
import linkC from '../controllers/link-controller';
import bodyChecker from '../middlewares/body-check';

const linkRouter = express.Router();

// Get links by profileid
// /links/:profileid
linkRouter.get('/:profileid', linkC.findById);

// Update links by profileid
// /links/:profileid
linkRouter.put('/:profileid', bodyChecker, linkC.updateLinks);

export default linkRouter;
