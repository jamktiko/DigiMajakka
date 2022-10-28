/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/comma-dangle */

import type express from 'express';
import queryDb from '../db-connection';
import profileValidator from '../models/profile-model';

// Return all profiles from database
const profileController = {
	async findAll(
		_request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const data = await queryDb('SELECT * FROM Profiili;', []);

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
				'SELECT * FROM Profiili WHERE idprofiili = ?',
				[_request.params.id]
			);
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
			// Profile needs to be validated before inserting it into databse
			// Function profileValidator return opbject which has validated profile and information if validation passed
			const profile = profileValidator(_request.body);
			if (!profile.valid) {
				throw new Error(JSON.stringify(profile));
			} else if (profile.valid) {
				const insertedProfile = await queryDb(
					'INSERT INTO Profiili (idprofiili, etunimi, sukunimi, puhelinnumero, kuvaus, mitaetsii, koulutusala, opintovuosi, julkisuus, Kayttaja_sahkoposti, Koulu_idKoulu, Paikkakunta_idPaikkakunta, kuva) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
					Object.values(profile.profile)
				);

				response.status(201).json({
					message: 'Profile created succesfully',
					success: true,
					profile: insertedProfile,
				});
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
			const values = Object.values(_request.body);
			if (values.length < 13) {
				throw new Error('Update does not have all required fields');
			}

			const update = await queryDb(
				'UPDATE Profiili SET idprofiili = ?, etunimi = ?, sukunimi = ?, puhelinnumero = ?, kuvaus = ?, mitaetsii = ?, koulutusala = ?, opintovuosi = ?, julkisuus = ?, Kayttaja_sahkoposti = ?, Koulu_idKoulu = ?, Paikkakunta_idPaikkakunta = ?, kuva = ? WHERE idprofiili = ?',
				[...values, values[0]]
			);

			response.status(200).json({
				message: 'Updated profile succesfully',
				success: true,
				update,
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
				'UPDATE Profiili SET ? = ? WHERE idprofiili = ?',
				[
					_request.params.column,
					_request.params.value,
					_request.params.id,
				]
			);
			response.status(200).json({
				message: 'Updated profile succesfully',
				success: true,
				update,
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
				'DELETE FROM Profiili WHERE idprofiili = ?',
				[_request.params.id]
			);
			response.status(200).json({
				message: 'Deleted profile succesfully',
				success: true,
				del,
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
			const data = queryDb(
				'SELECT * FROM ProfiiliOsaaminen INNER JOIN Erikoisosaaminen ON Erikoisosaaminen_iderikoisosaaminen=idErikoisosaaminen INNER JOIN Osaaminen ON Osaaminen_taitoid=taitoid WHERE Profiili_idprofiili = ? ;',
				[_request.params.id]
			);

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
				'SELECT * FROM ProfiiliOsaaminen WHERE Profiili_idprofiili = ?',
				[_request.params.profileid]
			);

			if (Array.isArray(skillExists) && skillExists.length <= 0) {
				// If profile doesn't have skill insert to ProfiiliOsaaminen table
				const profileSkillInsert = await queryDb(
					'INSERT INTO ProfiiliOsaaminen VALUES (?, (SELECT idErikoisosaaminen FROM Erikoisosaaminen WHERE nimi = ?), (SELECT Osaaminen_taitoid FROM Erikoisosaaminen WHERE nimi = ?));',
					[
						Number(_request.params.profileid),
						_request.params.skillname,
						_request.params.skillname,
					]
				);

				response.status(200).json(profileSkillInsert);
			} else if (skillExists) {
				throw new Error(
					'Profile already has skill ' +
						String(_request.params.skillname)
				);
			}
		} catch (error: unknown) {
			next(error);
		}
	},
};
export default profileController;
