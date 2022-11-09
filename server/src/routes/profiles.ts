/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/comma-dangle */
import express from 'express';
import profileC from '../controllers/profile-controller';
import {authHandler} from '../middlewares/auth';
import userCheck from '../middlewares/user-check';
import bodyChecker from '../middlewares/body-check';
// eslint-disable-next-line new-cap
const profileRouter = express.Router();

// Route to get all profiles
profileRouter.get('/findAll', profileC.findAll);

// Route to get profile with specific id
profileRouter.get('/findById/:id', profileC.findById);

// Route to post profile
profileRouter.post('/create', bodyChecker, profileC.createProfile);

// Route to update profile
profileRouter.put(
	'/update/:id',
	bodyChecker,
	authHandler,
	userCheck,
	profileC.updateProfile
);

// Update one column of profile
profileRouter.put(
	'/updateOne/:id/:column/:value',
	bodyChecker,
	authHandler,
	userCheck,
	profileC.updateProfileColumn
);
// Deletes profile by id
profileRouter.delete(
	'/deleteOne/:id',
	bodyChecker,
	authHandler,
	userCheck,
	profileC.deleteProfile
);

// Gets all skills of a profile
profileRouter.get('/skills/:id', profileC.findProfileSkills);

// Insert skill to a profile
profileRouter.post(
	'/insertSkill/:profileid/:skillname',
	bodyChecker,

	profileC.addSkill
);

profileRouter.post('/findByEmail', bodyChecker, profileC.findByEmail);

export = profileRouter;
