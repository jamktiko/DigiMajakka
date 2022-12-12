/* eslint-disable new-cap */

import express from 'express';
import skillC from '../controllers/skill-controller';
import bodyChecker from '../middlewares/body-check';
import {authHandler} from '../middlewares/auth';
import userCheck from '../middlewares/user-check';
//
const skillRouter = express.Router();

// Get all skills
// /skills/

skillRouter.get('/', skillC.findAll);

// Gets all skills of a profile
// /skills/profile/:id
skillRouter.get(
  '/profile/:profileid',

  skillC.findProfileSkills,
);

// Insert skill to a profile
// /skills/profile/:profileid/:skillname
skillRouter.post(
  '/profile/:profileid',
  bodyChecker,
  authHandler,
  userCheck,
  skillC.addSkill,
);

skillRouter.delete(
  '/profile/:profileid',
  bodyChecker,
  authHandler,
  userCheck,
  skillC.deleteSkillFromProfile,
);
export default skillRouter;
