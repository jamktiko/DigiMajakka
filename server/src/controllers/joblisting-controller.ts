/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
import type express from 'express';

import uniqid from 'uniqid';
import queryDb from '../db-connection';
import sendEmail from '../ses-helper';

const joblistingC = {
	// Return all jobs from Tyoilmoitus board
	async findAll(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb('SELECT * FROM JobAdvert;', []);
			console.log(data);

			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},
	async createAdvert(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const id: string = uniqid();
			const insert = queryDb(
				'INSERT INTO JobAdvert VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
				[id, ...Object.values(_request.body)]
			);
			// Amazon ses code here
			await sendEmail(
				'digimajakka.asiakaspalvelu@gmail.com',
				'Testi sposti',
				'testi'
			);
			console.log(insert);
			response.status(201).json({
				message: 'Created advert successfully',
				success: true,
			});
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default joblistingC;
