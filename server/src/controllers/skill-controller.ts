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
			const data = await queryDb(
				'SELECT * FROM Skills WHERE skillid = ?;',
				[_request.params.id]
			);

			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},
	// Find all skills and specialskills
	async findAll(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb(
				'SELECT * FROM Skills S INNER JOIN SpecialSkills SS ON S.skillid=SS.Skills_skillid;',
				[]
			);
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
				'SELECT SS.name AS SpecialSkill, S.name AS Skill FROM UserProfileSpecialSkills INNER JOIN SpecialSkills SS ON SpecialSkills_specialskillid=specialskillid INNER JOIN Skills S ON Skills_skillid=skillid WHERE UserProfile_userprofileid = ?;',
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
				'SELECT S.name AS S, SS.name AS SS FROM UserProfileSpecialSkills US INNER JOIN SpecialSkills SS ON SS.specialskillid=US.SpecialSkills_specialskillid INNER JOIN Skills S ON S.skillid=US.SpecialSkills_Skills_skillid WHERE US.UserProfile_userprofileid = ?;',
				[_request.params.profileid]
			);

			// Make array to store skills
			const skillArray: string[] = [];
			// Query returns data in format [{}, {}] so extract values from objects into single array
			for (const x of skillExists) {
				const items = Object.values(x);
				for (const y of items) {
					skillArray.push(String(y));
				}
			}

			// Check that profile doesn't already have skill
			if (!skillArray.includes(_request.params.skillname)) {
				let sql = '';

				// Different sql query depending if trying to insert specialskill or skill
				if (_request.body.specialskill) {
					sql =
						'INSERT INTO UserProfileSpecialSkills VALUES (?, (SELECT specialskillid FROM SpecialSkills WHERE name = ?), (SELECT Skills_skillid FROM SpecialSkills WHERE name = ?));';
				} else {
					sql =
						'INSERT INTO UserProfileSkills VALUES (?, (SELECT skillid FROM Skills WHERE name = ?));';
				}

				// If profile doesn't have skill insert to ProfiiliOsaaminen table
				const profileSkillInsert = await queryDb(sql, [
					Number(_request.params.profileid),
					...Object.values(_request.body),
				]);
				console.log(profileSkillInsert);

				response.status(201).json(profileSkillInsert);
				// If profile already has skill just return ok status and message profile already has skill
			} else if (skillArray.includes(_request.params.skillname)) {
				response.status(200).json({
					message:
						'Profile already has skill ' +
						String(_request.params.skillname),
				});
			}
		} catch (error: unknown) {
			next(error);
		}
	},
};

export default skillC;
