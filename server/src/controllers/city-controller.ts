/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */

import type express from 'express';
import queryDb from '../db-connection';

const cityC = {
	async findById(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb('SELECT * FROM City WHERE cityid = ?;', [
				_request.params.id,
			]);
			console.log(data);
			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default cityC;
