/* eslint-disable import/extensions */

import express from 'express';
import userC from '../controllers/user-controller';
// eslint-disable-next-line new-cap
const userRouter = express.Router();

// Route to sign up new user
// /users/signup
userRouter.post('/signup', userC.singUp);

// Route to sign in existing user
// /users/signin
userRouter.post('/signin', userC.signIn);

// Route to confirm new users sign up with code received via email
// /users/confirm
userRouter.post('/confirm', userC.confirmSignup);

// Route to resend confirmation code to user
// /users/resend
userRouter.post('/resend', userC.resendConfirmCode);

// Route to sign out signed in user
// /users/signout
userRouter.post('/signout', userC.signOut);

// Delete user
// /users/delete
userRouter.post('/delete', userC.deleteUser);

export = userRouter;
