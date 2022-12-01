import express from 'express';
import profileC from '../controllers/profile-controller';
import bodyChecker from '../middlewares/body-check';
import {authHandler} from '../middlewares/auth';
import userCheck from '../middlewares/user-check';
// eslint-disable-next-line new-cap
const profileRouter = express.Router();

// Route to get all profiles
// /profiles/
profileRouter.get('/', profileC.findAll);

// Route to get profile with specific id
// /profiles/:id
profileRouter.get('/:id', profileC.findById);

// Route to post profile
// /profiles/
profileRouter.post('/', authHandler, bodyChecker, profileC.createProfile);

// Route to update profile
// /profiles/:id
profileRouter.put(
  '/:id',
  bodyChecker,
  authHandler,
  userCheck,
  profileC.updateProfile,
);

// Deletes profile by id
// /profiles/:id
profileRouter.delete('/:id', authHandler, userCheck, profileC.deleteProfile);

// Find profile by useraccount email
// /profiles/email/:email
profileRouter.get('/user/email', authHandler, profileC.findByEmail);

export = profileRouter;
