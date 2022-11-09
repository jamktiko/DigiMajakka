/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
import type express from 'express';

import uniqid from 'uniqid';
import queryDb from '../db-connection';
import SesHelper from '../service-helpers/ses-helper';
import jobadvertValidation from '../validators/jobadvert-validator';
import CustomError from '../custom-error';

// Create new instacne of ses helper
const ses = new SesHelper();

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

			// Validate profile
			const valid = jobadvertValidation({advertid, ..._request.body});

			// If profile is not valid throw error
			if (valid.valid && typeof valid.filteredAdvert !== 'undefined') {
				const insert = queryDb(
					'INSERT INTO JobAdvert VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
					[...Object.values(valid.filteredAdvert)]
				);
				// Send email to job adverts creator with link to update advert
				await ses.sendEmail(
					'digimajakka.asiakaspalvelu@gmail.com',
					'Testi sposti',
					'testi'
				);

				console.log(insert);

				response.status(201).json({
					message: 'Created advert successfully',
					success: true,
				});
			} else {
				throw new CustomError(
					JSON.stringify({
						message:
							'Some advert fields not valid, shows false at invalid fields',
						phonenumber: valid.phonenumberValid,
						email: valid.emailValid,
						fieldtypes: valid.typeCheck,
					}),
					400
				);
			}
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default joblistingC;
