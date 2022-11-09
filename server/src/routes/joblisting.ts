/* eslint-disable import/extensions */
import express from 'express';
import joblistingC from '../controllers/joblisting-controller';
import bodyChecker from '../middlewares/body-check';

// eslint-disable-next-line new-cap
const joblistingRouter = express.Router();

// Gets all joblistings
joblistingRouter.get('/findAll', joblistingC.findAll);
joblistingRouter.post('/create', bodyChecker, joblistingC.createAdvert);

export default joblistingRouter;
