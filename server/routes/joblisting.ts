/* eslint-disable import/extensions */
import express from 'express';
import * as joblistingC from '../controllers/joblisting-controller';

// eslint-disable-next-line new-cap
const joblistingRouter = express.Router();

joblistingRouter.get('/', joblistingC.findAll);

export default joblistingRouter;
