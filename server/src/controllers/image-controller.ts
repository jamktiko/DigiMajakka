/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */

import type express from 'express';

import querydb from '../db-connection';
import imageHelper from '../service-helpers/s3-image-helper';

const imageC = {
	// Function to upload image to s3 bucket
	async uploadImage(
		_request: express.Request,
		_response: express.Response,
		next: express.NextFunction
	) {
		try {
			// Check that file is not undefined
			if (typeof _request.file !== 'undefined') {
				// Upload image to s3 bucket
				const result = await imageHelper.uploadImg(_request.file);
				// Upload s3 link into profile in database
				const dbresult = await querydb(
					'UPDATE UserProfile SET picturelink = ? WHERE userprofileid = ?',
					[result.Key, _request.params.id]
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
		next: express.NextFunction
	) {
		try {
			// Get profiles information from database
			const profile = await querydb(
				'SELECT * FROM UserProfile WHERE userprofileid = ?;',
				[_request.params.id]
			);

			// Check that profile were returned
			if (
				Array.isArray(profile) &&
				profile !== null &&
				profile.length > 0
			) {
				// Check that link exists in profile
				if (
					typeof profile[0].picturelink === 'string' &&
					(!profile[0].picturelink ||
						profile[0].picturelink.length === 0)
				) {
					throw new Error('No link to image found in profile');
					// Check that link is correct type
				} else if (
					profile[0].picturelink &&
					typeof profile[0].picturelink === 'string'
				) {
					// Use imageHelpers method to cretae readstream for image
					const readStream = await imageHelper.getImg(
						profile[0].picturelink
					);
					// Pipe express to send image as response
					readStream.pipe(response);

					// If link is not correct type throw error
				} else {
					throw new TypeError('Picture link is not type string');
				}
			} else {
				throw new Error(
					'Error when finding profile. Profile id may be wrong.'
				);
			}
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default imageC;
