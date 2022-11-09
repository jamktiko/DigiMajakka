/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/comma-dangle */

import type express from 'express';
import queryDb from '../db-connection';
import * as validation from '../validation';
import type Profile from '../models/profile-model';

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
	async createProfile(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			// Find users data and citys name that users school is in
			const userdata = await queryDb(
				'SELECT UA.email, UA.School_name AS schoolname, SC.City_name AS cityname FROM UserAccount UA INNER JOIN SchoolCity SC ON SC.School_name=UA.School_name WHERE UA.email = ?;',
				[_request.body.email]
			);

			// Take users data from array
			const user = userdata[0];

			// Check that user object has specified keys and that they are correct type
			if (
				typeof user.email === 'string' &&
				typeof user.schoolname === 'string' &&
				typeof user.cityname === 'string'
			) {
				// Template profile with placeholder data
				const profile: Profile = {
					firstname: 'Etunimi',
					familyname: 'Sukunimi',
					phonenumber: 'Puhelinnumero',
					description: 'Kuvaus',
					lookingfor: 'Mitä etsit',
					studyfield: 'Koulutusala',
					yearofstudy: 1,
					publicity: false,
					picturelink: '',
					email: '',
					cityname: user.cityname,
					accountemail: user.email,
					schoolname: user.schoolname,
				};
				// Insert placeholder data to users profile
				const insertedProfile = await queryDb(
					'INSERT INTO UserProfile (firstname, familyname, phonenumber, aboutme, lookingfor, studyfield, yearofstudy, public, picturelink, email, City_name, UserAccount_email, UserAccount_School_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
					Object.values(profile)
				);
				console.log(insertedProfile);

				response.status(201).json({
					message: 'Profile created succesfully',
					success: true,
				});
			} else {
				throw new TypeError('Error when trying to create new profile');
			}
		} catch (error: unknown) {
			next(error);
		}
	},

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
			const emaildata = await queryDb(
				'SELECT School.emailend FROM UserAccount INNER JOIN School ON UserAccount.School_name=School.name WHERE UserAccount.email = ?;',
				[_request.params.id]
			);

			const emaildataobj = emaildata[0];

			if (
				(_request.body.useraccountemail &&
					!validation.validateEmail(
						_request.body.useraccountemail
					)) ||
				!validation.validateEmailEnd(
					_request.body.useraccountemail,
					String(emaildataobj.emailend)
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
				'SELECT SS.name AS SpecialSkill, S.name AS Skill FROM UserProfileSkills INNER JOIN SpecialSkills SS ON SpecialSkills_specialskillid=specialskillid INNER JOIN Skills S ON Skills_skillid=skillid WHERE UserProfile_userprofileid = ?;',
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
				'SELECT S.name AS S, SS.name AS SS FROM UserProfileSkills US INNER JOIN SpecialSkills SS ON SS.specialskillid=US.SpecialSkills_specialskillid INNER JOIN Skills S ON S.skillid=US.SpecialSkills_Skills_skillid WHERE US.UserProfile_userprofileid = ?;',
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
	// Find profile by user email
	async findByEmail(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			console.log(_request.body);
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
