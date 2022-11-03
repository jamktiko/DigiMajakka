/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
import type express from 'express';
import querydb from '../db-connection';
import imageHelper from '../image-helper';

const imageC = {
	async uploadImage(
		_request: express.Request,
		_response: express.Response,
		next: express.NextFunction
	) {
		try {
			if (typeof _request.file !== 'undefined') {
				const result = await imageHelper.uploadImg(_request.file);
				const dbresult = await querydb(
					'UPDATE UserProfile SET picturelink = ? WHERE userprofileid = ?',
					[result.Key, _request.params.id]
				);
				console.log('Successfully returned image from s3 bucket');

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
	async getImage(
		_request: express.Request,
		response: express.Response,
		_next: express.NextFunction
	) {
		const profile = await querydb(
			'SELECT * FROM UserProfile WHERE userprofileid = ?;',
			[_request.params.id]
		);

		if (Array.isArray(profile) && profile !== null && profile.length > 0) {
			const readStream = await imageHelper.getImg(
				typeof profile[0].picturelink === 'string'
					? profile[0].picturelink
					: ''
			);
			readStream.pipe(response);
		} else {
			throw new Error(
				'Error when finding profile. Profile id may be wrong.'
			);
		}
	},
};

export default imageC;
