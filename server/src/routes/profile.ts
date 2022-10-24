/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/comma-dangle */
import express from 'express';
import * as profileC from '../controllers/profile-controller';
// eslint-disable-next-line new-cap
const profileRouter = express.Router();

// Route to get all profiles
profileRouter.get('/findAll', profileC.findAll);

// Route to get profile with specific id
profileRouter.get('/findById/:id', profileC.findById);

// Route to post profile
profileRouter.post('/create', profileC.createProfile);

// Route to update profile
profileRouter.put('/update', profileC.updateProfile);

// Update one column of profile
profileRouter.put(
	'/updateOne/:id/:column/:value',
	profileC.updateProfileColumn
);

profileRouter.delete('/deleteOne/:id', profileC.deleteProfile);

export = profileRouter;
