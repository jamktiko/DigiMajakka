/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/comma-dangle */

import type express from 'express';
import queryDb from '../db-connection';
import * as validation from '../validators/validation';
import type Profile from '../models/profile-model';
import CustomError from '../custom-error';
import convertBodyToQueryFormat from '../functions/convert-body-to-update-string';
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
				throw new CustomError('Phonenumber is not valid', 400);
			}

			if (
				_request.body.email &&
				!validation.validateEmail(_request.body.email)
			) {
				throw new CustomError('Email is not valid', 400);
			}

			const {sql, sqlvals} = convertBodyToQueryFormat(_request);

			const update = await queryDb(sql, [
				...sqlvals,
				Number(_request.params.id),
			]);

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
