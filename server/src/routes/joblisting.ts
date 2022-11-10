/* eslint-disable import/extensions */
import express from 'express';
import joblistingC from '../controllers/joblisting-controller';
import bodyChecker from '../middlewares/body-check';

// eslint-disable-next-line new-cap
const joblistingRouter = express.Router();

// Gets all jobadverts
// /jobadverts/
joblistingRouter.get('/', joblistingC.findAll);

// Create new jobadvert
// /jobadverts/
joblistingRouter.post('/', bodyChecker, joblistingC.createAdvert);

export default joblistingRouter;
