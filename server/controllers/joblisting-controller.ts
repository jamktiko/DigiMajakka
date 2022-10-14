/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
import type express from 'express';
import queryDb from '../db-connection';
import errorHandler from '../error-handler';

export const findAll = async (
	_request: express.Request,
	response: express.Response
) => {
	try {
		const data = await queryDb('SELECT * FROM Tyoilmoitus;', []);

		response.status(200).json(data);
	} catch (error: unknown) {
		errorHandler(error);
	}
};
