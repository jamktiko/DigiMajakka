/* eslint-disable new-cap */

import express from 'express';

import multer from 'multer';
import imageC from '../controllers/image-controller';
import {authHandler} from '../middlewares/auth';
import userCheck from '../middlewares/user-check';
const imageRouter = express.Router();
const upload = multer({dest: './src/images'});

imageRouter.post(
  '/:profileid',
  authHandler,
  userCheck,
  upload.single('image'),
  imageC.uploadImage,
);
imageRouter.get('/:profileid', imageC.getImage);

export default imageRouter;
