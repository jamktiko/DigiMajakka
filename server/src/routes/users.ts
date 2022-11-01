/* eslint-disable import/extensions */

import express from 'express';
import userC from '../controllers/user-controller';
// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post('/signup', userC.singUp);

userRouter.post('/signin', userC.signIn);

userRouter.post('/confirm', userC.confirmSignup);

userRouter.post('/resend', userC.resendConfirmCode);

userRouter.post('/signout', userC.signOut);

export = userRouter;
