/* eslint-disable new-cap */

import express from 'express';

import multer from 'multer';
import imageC from '../controllers/image-controller';

const imageRouter = express.Router();
const upload = multer({dest: './src/images'});

imageRouter.post('/:id', upload.single('image'), imageC.uploadImage);
imageRouter.get('/:id', imageC.getImage);

export default imageRouter;
