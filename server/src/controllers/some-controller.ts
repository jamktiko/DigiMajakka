/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */

import type express from 'express';

import queryDb from '../db-connection';

export const findByProfileId = async (
	_request: express.Request,
	response: express.Response,
	next: express.NextFunction
) => {
	try {
		const data = await queryDb(
			'SELECT * FROM Somelinkit WHERE Profiili_idprofiili=?',
			[_request.params.id]
		);

		response.status(200).json(data);
	} catch (error: unknown) {
		next(error);
	}
};

// Export const insertLink = async (
// 	_request: express.Request,
// 	response: express.Response,
// 	next: express.NextFunction
// ) => {
// 	try {
// 		const data = await queryDb('INSERT INTO Somelinkit ')
// 	} catch (error) {}
// };
