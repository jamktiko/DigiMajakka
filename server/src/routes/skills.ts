/* eslint-disable new-cap */
/* eslint-disable import/extensions */
import express from 'express';
import skillC from '../controllers/skill-controller';
import bodyChecker from '../middlewares/body-check';

const skillRouter = express.Router();

// Get all skills
// /skills/

skillRouter.get('/', skillC.findAll);

// Gets all skills of a profile
// /skills/profile/:id
skillRouter.get('/profile/:id', skillC.findProfileSkills);

// Insert skill to a profile
// /skills/profile/:profileid/:skillname
skillRouter.post('/profile/:profileid', bodyChecker, skillC.addSkill);

export default skillRouter;
