import express from 'express';
import joblistingC from '../controllers/joblisting-controller';

// eslint-disable-next-line new-cap
const joblistingRouter = express.Router();

// Gets all jobadverts
// /jobadverts/
joblistingRouter.get('/', joblistingC.findAll);

// Create new jobadvert
// /jobadverts/
joblistingRouter.post('/', joblistingC.createAdvert);

// Delete job advert
// /jobadverts/
joblistingRouter.delete('/:advertid', joblistingC.deleteAdvert);

// Update job advert
// /jobadverts/:advertid
joblistingRouter.put('/:advertid', joblistingC.updateAdvert);

export default joblistingRouter;
