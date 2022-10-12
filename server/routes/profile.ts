import express from 'express';
import {
	findAll,
	findById,
	createProfile,
} from '../controllers/profile-controller.js';
// eslint-disable-next-line new-cap
const profileRouter = express.Router();

// Route to get all profiles
profileRouter.get('/findAll', findAll);

// Route to get profile with specific id
profileRouter.get('/findById/:id', findById);

// Route to post profile
profileRouter.post('/create', createProfile);

export = profileRouter;
