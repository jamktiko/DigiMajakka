/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/comma-dangle */

import type express from 'express';
import queryDb from '../db-connection';
import {profileValidator} from '../models/profile-model';
import * as validation from '../validation';

// Return all profiles from database
const profileController = {
	async findAll(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb('SELECT * FROM UserProfile;', []);
			console.log(data);

			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},

	// Return one profile by specific id
	async findById(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb(
				'SELECT * FROM UserProfile WHERE userprofileid = ?',
				[_request.params.id]
			);
			console.log(data);

			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},

	// Insert profile into database
	// async createProfile(
	// 	_request: express.Request,
	// 	response: express.Response,
	// 	next: express.NextFunction
	// ) {
	// 	try {
	// 		// Profile needs to be validated before inserting it into databse
	// 		// Function profileValidator return opbject which has validated profile and information if validation passed
	// 		const profile = profileValidator(_request.body);
	// 		if (!profile.valid) {
	// 			throw new Error(JSON.stringify(profile));
	// 		} else if (profile.valid) {
	// 			const insertedProfile = await queryDb(
	// 				'INSERT INTO UserProfile (userprofileid, firstname, familyname, phonenumber, aboutme, lookingfor, studyfield, yearofstudy, public, UserAccount_email, School_schoolid, City_cityid, picturelink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	// 				Object.values(profile.profile)
	// 			);
	// 			console.log(insertedProfile);

	// 			response.status(201).json({
	// 				message: 'Profile created succesfully',
	// 				success: true,
	// 			});
	// 		}
	// 	} catch (error: unknown) {
	// 		next(error);
	// 	}
	// },

	// Updates all fields of profile. Values taken from request body.
	async updateProfile(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			// Check if phone number is in valid format
			if (
				_request.body.phonenumber &&
				!validation.validatePhoneNumber(_request.body.phonenumber)
			) {
				throw new Error('Phone number is not valid');
			}

			// Check if email is in valid format
			const emaildata = queryDb(
				'SELECT School.emailend FROM UserAccount INNER JOIN School ON UserAccount.School_schoolid=School.schoolid WHERE UserAccount.email = ?;',
				[_request.params.id]
			);

			if (
				_request.body.email &&
				Array.isArray(emaildata) &&
				!validation.validateEmail(
					_request.body.email,
					emaildata[0].emailend
				)
			) {
				throw new Error('Email is not valid');
			}

			// Take values values from object to array
			const values = Object.values(_request.body);
			// Take keys(columns) from object to array
			const keys = Object.keys(_request.body);

			// Updatestring will contain update query
			// It is contructed from values and keys separated from object
			// This allows to use this route to update any number of columns in table row

			// Start string of the query
			let updateString = 'UPDATE UserProfile SET ';
			// Add each of keys(column names) one by one into updatestring
			for (const x of keys) {
				updateString += String(x) + ' = ?';
				// If added last key then insert just ' ' otherwise ',' is needed
				updateString +=
					keys.indexOf(x) === keys.length - 1 ? ' ' : ', ';
			}

			// Last part of update string where you specify profile id
			updateString += 'WHERE userprofileid = ?;';

			const update = await queryDb(updateString, [
				// Destructure values and ad profile id from params to last index of array
				...values,
				Number(_request.params.id),
			]);
			// If (values.length < 13) {
			// 	throw new Error('Update does not have all required fields');
			// }

			// const update = await queryDb(
			// 	'UPDATE Profiili SET idprofiili = ?, etunimi = ?, sukunimi = ?, puhelinnumero = ?, kuvaus = ?, mitaetsii = ?, koulutusala = ?, opintovuosi = ?, julkisuus = ?, Kayttaja_sahkoposti = ?, Koulu_idKoulu = ?, Paikkakunta_idPaikkakunta = ?, kuva = ? WHERE idprofiili = ?',
			// 	[...values, values[0]]
			// );
			console.log('Update succesfull');

			console.log(update);

			response.status(200).json({
				message: 'Updated profile succesfully',
				success: true,
			});
		} catch (error: unknown) {
			next(error);
		}
	},

	// Updates one column of profile specified in request
	async updateProfileColumn(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const update = await queryDb(
				'UPDATE UserProfile SET ? = ? WHERE userprofileid = ?',
				[
					_request.params.column,
					_request.params.value,
					_request.params.id,
				]
			);
			console.log(update);

			response.status(200).json({
				message: 'Updated profile succesfully',
				success: true,
			});
		} catch (error: unknown) {
			next(error);
		}
	},

	// Deletes profile by id
	async deleteProfile(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const del = await queryDb(
				'DELETE FROM UserProfile WHERE userprofileid = ?',
				[_request.params.id]
			);
			console.log(del);

			response.status(200).json({
				message: 'Deleted profile succesfully',
				success: true,
			});
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
				'SELECT * FROM UserProfileSkills INNER JOIN SpecialSkills ON SpecialSkills_specialskillid=specialskillid INNER JOIN Skills ON Skills_skillid=skillid WHERE UserProfile_userprofileid = ?;',
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
			const skillExists = await queryDb(
				'SELECT S.name AS S, SS.name AS SS FROM UserProfileSkills US INNER JOIN SpecialSkills SS ON SS.specialskillid=US.SpecialSkills_specialskillid INNER JOIN Skills S ON S.skillid=US.SpecialSkills_Skills_skillid WHERE US.UserProfile_userprofileid = ?;',
				[_request.params.profileid]
			);

			const skillArray: string[] = [];

			for (const x of skillExists) {
				const items = Object.values(x);
				for (const y of items) {
					skillArray.push(String(y));
				}
			}

			if (!skillArray.includes(_request.params.skillname)) {
				// If profile doesn't have skill insert to ProfiiliOsaaminen table
				const profileSkillInsert = await queryDb(
					'INSERT INTO UserProfileSkills VALUES (?, (SELECT specialskillid FROM SpecialSkills WHERE name = ?), (SELECT Skills_skillid FROM SpecialSkills WHERE name = ?));',
					[
						Number(_request.params.profileid),
						_request.params.skillname,
						_request.params.skillname,
					]
				);
				console.log(profileSkillInsert);

				response.status(200).json(profileSkillInsert);
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
	// Find profile by user email
	async findByEmail(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			console.log(_request.body);

			const data = await queryDb(
				'SELECT * FROM UserProfile WHERE UserAccount_email = ?',
				[_request.body.email]
			);
			console.log(data);

			response.status(200).json(data);
		} catch (error: unknown) {
			next(error);
		}
	},
};
export default profileController;
