/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
import type express from 'express';

import queryDb from '../db-connection';
import convertBodyToQueryFormat from '../functions/convert-body-to-update-string';

const linkC = {
	// Function to find links by profile id
	async findById(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb(
				'SELECT * FROM Links WHERE UserProfile_userprofileid= ?;',
				[_request.params.profileid]
			);
			console.log(data);
			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},
	async updateLinks(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			if (!_request.body) {
				throw new Error('No body received in request');
			}

			const {sql, sqlvals} = convertBodyToQueryFormat(_request);
			const update = await queryDb(sql, [
				// Destructure values and ad profile id from params to last index of array
				...sqlvals,
				Number(_request.params.profileid),
			]);

			console.log(update);
			response.status(200).json({
				success: true,
				message: 'Updated links successfully',
			});
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default linkC;
