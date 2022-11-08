/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
import type express from 'express';
import queryDb from '../db-connection';

const somelinkC = {
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
	async addLink(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const result = await queryDb(
				'INSERT INTO Links (name, link, UserProfile_userprofileid) VALUES (?, ?, ?);',
				[
					_request.body.name,
					_request.body.link,
					_request.body.profileid,
				]
			);
			console.log(result);
			response.status(201).json({
				message: 'Added link successfully',
				success: true,
			});
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default somelinkC;
