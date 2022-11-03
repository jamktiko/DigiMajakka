/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */

import type express from 'express';
import queryDb from '../db-connection';

const schoolC = {
	async findById(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb(
				'SELECT * FROM School WHERE schoolid = ?;',
				[_request.params.id]
			);
			console.log(data);
			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default schoolC;
