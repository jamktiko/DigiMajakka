/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
import type express from 'express';

import queryDb from '../db-connection';

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

			// Take values values from object to array
			const values = Object.values(_request.body);
			// Take keys(columns) from object to array
			const keys = Object.keys(_request.body);

			// Updatestring will contain update query
			// It is contructed from values and keys separated from object
			// This allows to use this route to update any number of columns in table row

			// Start string of the query
			let updateString = 'UPDATE Links SET ';
			// Add each of keys(column names) one by one into updatestring
			for (const x of keys) {
				updateString += String(x) + ' = ?';
				// If added last key then insert just ' ' otherwise ',' is needed
				updateString +=
					keys.indexOf(x) === keys.length - 1 ? ' ' : ', ';
			}

			// Last part of update string where you specify profile id
			updateString += 'WHERE UserProfile_userprofileid = ?;';

			const update = await queryDb(updateString, [
				// Destructure values and ad profile id from params to last index of array
				...values,
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
