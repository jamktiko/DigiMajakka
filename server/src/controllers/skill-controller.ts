/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */

import type express from 'express';
import queryDb from '../db-connection';

export const findAll = async (
	_request: express.Request,
	response: express.Response,
	next: express.NextFunction
) => {
	try {
		const data = await queryDb('SELECT * FROM Skills;', []);

		response.status(200).json(data);
	} catch (error: unknown) {
		next(error);
	}
};

export const findOne = async (
	_request: express.Request,
	response: express.Response,
	next: express.NextFunction
) => {
	try {
		const data = await queryDb('SELECT * FROM Skills WHERE skillid = ?;', [
			_request.params.id,
		]);

		response.status(200).json(data);
	} catch (error: unknown) {
		next(error);
	}
};
