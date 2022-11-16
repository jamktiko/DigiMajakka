/* eslint-disable import/extensions */

import express from 'express';
import userC from '../controllers/user-controller';
import bodyChecker from '../middlewares/body-check';
import handleError from '../middlewares/school-change-error-handler';
// eslint-disable-next-line new-cap
const userRouter = express.Router();

// Route to sign up new user
// /users/signup
userRouter.post('/signup', bodyChecker, userC.singUp);

// Route to sign in existing user
// /users/signin
userRouter.post('/signin', bodyChecker, userC.signIn);

// Route to confirm new users sign up with code received via email
// /users/confirm
userRouter.post('/confirm', bodyChecker, userC.confirmSignup);

// Route to resend confirmation code to user
// /users/resend
userRouter.post('/resend', bodyChecker, userC.resendConfirmCode);

// Route to sign out signed in user
// /users/signout
userRouter.post('/signout', bodyChecker, userC.signOut);

// Delete user
// /users/delete
userRouter.post('/delete', bodyChecker, userC.deleteUser);

// Change users school
// /users/school
userRouter.put('/school', bodyChecker, userC.updateSchool, handleError);

export = userRouter;
