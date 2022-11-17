/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */

import type express from 'express';
import queryDb from '../db-connection';

const skillC = {
	// Find Skill by skill id
	async findOne(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb('SELECT * FROM Skills WHERE name = ?;', [
				_request.params.name,
			]);

			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},
	// Find all skills
	async findAll(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb('SELECT * FROM Skills;', []);
			console.log(data);

			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},
	// Finds skills that profile with specific id has
	async findProfileSkills(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb(
				'SELECT Skills_name AS name FROM UserProfileSkills WHERE Userprofile_userprofileid = ?;',
				[_request.params.id]
			);
			console.log(data);

			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},

	// Adds skill to profile with specific id
	async addSkill(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			// Check if profile already have skill provided in request
			// Find all profiles skills
			const skillExists = await queryDb(
				'SELECT Skills_name AS name FROM UserProfileSkills WHERE Userprofile_userprofileid = ?;',
				[_request.params.profileid]
			);

			// Profiles existing skill
			const oldSkills = [];

			for (const skill of skillExists) {
				oldSkills.push(skill.name);
			}

			const newSkills = [];

			const skillsToInsert = [];

			if (_request.body.skills && Array.isArray(_request.body.skills)) {
				skillsToInsert.push(..._request.body.skills);
			}

			for (const skill of skillsToInsert) {
				if (Array.isArray(oldSkills) && !oldSkills.includes(skill)) {
					// If profile doesn't have skill insert to ProfiiliOsaaminen table
					if (
						skillsToInsert.indexOf(skill) + 1 ===
						skillsToInsert.length
					) {
						newSkills.push(
							'(' +
								'"' +
								String(skill) +
								'"' +
								', ' +
								String(_request.params.profileid) +
								')'
						);
					} else {
						newSkills.push(
							'(' +
								'"' +
								String(skill) +
								'"' +
								', ' +
								String(_request.params.profileid) +
								'), '
						);
					}
				}
			}

			console.log(newSkills);

			if (newSkills.length > 0) {
				let sql = 'INSERT INTO UserProfileSkills VALUES ';

				for (const x of newSkills) {
					sql += String(x);
				}

				sql += ';';

				const result = await queryDb(sql, []);

				console.log(result);

				response.status(201).json({
					success: true,
					message: 'Inserted new skills successfully',
				});
			} else {
				console.log('All skills were already assigned to profile');

				response.status(200).json({
					success: true,
					message:
						'No new skills inserted because all provided skills were already assigned to profile',
				});
			}
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default skillC;
