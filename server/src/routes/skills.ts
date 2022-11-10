/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable new-cap */
/* eslint-disable import/extensions */
import express from 'express';
import skillC from '../controllers/skill-controller';
import bodyChecker from '../middlewares/body-check';

const skillRouter = express.Router();

// Gets all skills of a profile
// /skills/profile/:id
skillRouter.get('/skills/:id', skillC.findProfileSkills);

// Insert skill to a profile
// /skills/profile/:profileid/:skillname
skillRouter.post(
	'/skills/:profileid/:skillname',
	bodyChecker,

	skillC.addSkill
);

export default skillRouter;
