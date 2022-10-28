/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
import type express from 'express';
import queryDb from '../db-connection';

// Returns all specialskills form Erikoisosaaminen table
export const findAll = async (
	_request: express.Request,
	response: express.Response,
	next: express.NextFunction
) => {
	try {
		const data = await queryDb('SELECT * FROM Erikoisosaaminen;', []);

		response.status(200).json(data);
	} catch (error: unknown) {
		next(error);
	}
};

// Returns specialskills that are under specified category
export const findByCategory = async (
	_request: express.Request,
	response: express.Response,
	next: express.NextFunction
) => {
	try {
		const data = await queryDb(
			'SELECT * FROM Osaaminen INNER JOIN Erikoisosaaminen ON taitoid=Osaaminen_taitoid WHERE taitoid=?;',
			[_request.params.id]
		);
		response.status(200).json(data);
	} catch (error: unknown) {
		next(error);
	}
};
