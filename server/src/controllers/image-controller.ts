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
      // Check that file is not undefined
      if (typeof _request.file !== 'undefined') {
        // Upload image to s3 bucket
        const result = await imageHelper.uploadImg(_request.file);
        // Upload s3 link into profile in database
        const dbresult = await querydb(
          'UPDATE UserProfile SET picturelink = ? WHERE userprofileid = ?',
          [result.Key, _request.params.id],
        );

        console.log(result);
        console.log(dbresult);
        _response.status(200).json({
          message: 'Successfully saved image',
          location: result.Location,
        });
      } else if (typeof _request.file === 'undefined') {
        throw new TypeError('no file received');
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
      const profile: [Record<string, unknown>] = await querydb(
        'SELECT * FROM UserProfile WHERE userprofileid = ?;',
        [_request.params.id],
      );
      // Check that profile were returned
      if (profile.length < 1) {
        throw new Error('Error when finding profile. Profile id may be wrong.');
      }

      // Check that link exists in profile and that it is type string
      if (
        typeof profile[0].picturelink === 'string' &&
        profile[0].picturelink.length > 0
      ) {
        // Use imageHelpers method to cretae readstream for image
        const readStream = await imageHelper.getImg(profile[0].picturelink);

        if (readStream !== null) {
          // Pipe express to send image as response
          readStream.pipe(response);
        } else {
          // If object does not exsist throw new error
          throw new CustomError('Object with given key does not exist', 404);
        }
      } else {
        // If profile does not have image throw new error
        throw new Error('No link to image found in profile');
      }
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default imageC;
