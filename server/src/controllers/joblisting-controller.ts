/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
import type express from 'express';

import uniqid from 'uniqid';
import queryDb from '../db-connection';
import sendEmail from '../ses-helper';
import jobadvertValidation from '../validators/jobadvert-validator';

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
	// Function to insert new advert into database
	async createAdvert(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			// Create unique id for advert
			const advertid: string = uniqid();
			const valid = jobadvertValidation({advertid, ..._request.body});
			if (!valid) {
				throw new Error(
					'Error when creating advert: validation failed'
				);
			}

			const insert = queryDb(
				'INSERT INTO JobAdvert VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
				[advertid, ...Object.values(_request.body)]
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
