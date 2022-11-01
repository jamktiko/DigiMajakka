/* eslint-disable import/extensions */

import express from 'express';
import userC from '../controllers/user-controller';
// eslint-disable-next-line new-cap
const userRouter = express.Router();

// Route to sign up new user
userRouter.post('/signup', userC.singUp);

// Route to sign in existing user
userRouter.post('/signin', userC.signIn);

// Route to confirm new users sign up with code received via email
userRouter.post('/confirm', userC.confirmSignup);

// Route to resend confirmation code to user
userRouter.post('/resend', userC.resendConfirmCode);

// Route to sign out signed in user
userRouter.post('/signout', userC.signOut);

export = userRouter;
