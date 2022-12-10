import type express from 'express';
import CustomError from '../custom-error';

import querydb from '../db-connection';
import imageHelper from '../service-helpers/s3-image-helper';

const imageC = {
  // Function to upload image to s3 bucket
  async uploadImage(
    _request: express.Request,
    _response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      // Check that file is not undefined or null
      if (typeof _request.file !== 'undefined' && !_request.file !== null) {
        // Upload image to s3 bucket
        const s3upload = await imageHelper.uploadImg(_request.file);

        // Upload s3 link into profile in database
        const databaseResult = await querydb(
          'UPDATE UserProfile SET picturelink = ? WHERE userprofileid = ?',
          [s3upload.Key, _request.params.profileid],
        );

        console.log(s3upload);

        console.log(databaseResult);

        _response.status(200).json({
          success: true,
          message: 'Successfully saved image',
        });
      } else {
        throw new Error('no file received');
      }
    } catch (error: unknown) {
      next(error);
    }
  },
  // Function to download image from s3 bucket
  async getImage(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      // Get profiles information from database
      const profile = await querydb(
        'SELECT * FROM UserProfile WHERE userprofileid = ?;',
        [_request.params.profileid],
      );

      // Check that profile were returned
      if (profile.length < 1) {
        throw new Error(
          'Error when finding profile. Profile profile id may be wrong.',
        );
      }

      // Check that link exists in profile and that it is type string
      if (
        typeof profile[0].picturelink === 'string' &&
        profile[0].picturelink.length > 0
      ) {
        // Use imageHelpers method to download image from s3 bucket
        const image = await imageHelper.getImg(profile[0].picturelink);

        // Check that image is not null
        // If it is, it means that object with given key does not exists
        if (image !== null) {
          response.send(image);
        } else {
          // If object does not exsist throw new error
          throw new CustomError('Object with given key does not exist', 404);
        }
      } else {
        // If profile does not have image throw new error
        throw new CustomError('No link to image found in profile', 404);
      }
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default imageC;
