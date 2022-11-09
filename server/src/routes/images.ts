/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable new-cap */
/* eslint-disable import/extensions */
import express from 'express';

import multer from 'multer';
import imageC from '../controllers/image-controller';
import bodyChecker from '../middlewares/body-check';

const imageRouter = express.Router();
const upload = multer({dest: './src/images'});

imageRouter.post(
	'/:id',
	bodyChecker,
	upload.single('image'),
	imageC.uploadImage
);
imageRouter.get('/:id', imageC.getImage);

export default imageRouter;
