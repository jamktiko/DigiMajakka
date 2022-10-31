/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/comma-dangle */
import express from 'express';
import profileC from '../controllers/profile-controller';
// eslint-disable-next-line new-cap
const profileRouter = express.Router();

// Route to get all profiles
profileRouter.get('/findAll', profileC.findAll);

// Route to get profile with specific id
profileRouter.get('/findById/:id', profileC.findById);

// Route to post profile
profileRouter.post('/create', profileC.createProfile);

// Route to update profile
profileRouter.put('/update/:id', profileC.updateProfile);

// Update one column of profile
profileRouter.put(
	'/updateOne/:id/:column/:value',
	profileC.updateProfileColumn
);
// Deletes profile by id
profileRouter.delete('/deleteOne/:id', profileC.deleteProfile);

// Gets all skills of a profile
profileRouter.get('/skills/:id', profileC.findProfileSkills);

// Insert skill to a profile
profileRouter.post('/insertSkill/:profileid/:skillname', profileC.addSkill);

export = profileRouter;
