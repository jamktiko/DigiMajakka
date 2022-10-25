/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/comma-dangle */

import type express from 'express';
import queryDb from '../db-connection';
import profileValidator from '../models/profile-model';
import errorHandler from '../error-handler';

// Return all profiles from database
export const findAll = async (
	_request: express.Request,
	response: express.Response
) => {
	try {
		const data = await queryDb('SELECT * FROM Profiili;', []);

		response.status(200).json(data);
	} catch (error: unknown) {
		console.log(error);
		response.status(400).json({
			message: error,
		});
	}
};

// Return one profile by specific id
export const findById = async (
	_request: express.Request,
	response: express.Response
) => {
	try {
		const data = await queryDb(
			'SELECT * FROM Profiili WHERE idprofiili = ?',
			[_request.params.id]
		);
		response.status(200).json(data);
	} catch (error: unknown) {
		errorHandler(error);
	}
};

// Insert profile into database
export const createProfile = async (
	_request: express.Request,
	response: express.Response
) => {
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
		errorHandler(error);
	}
};

// Updates all fields of profile. Values taken from request body.
export const updateProfile = async (
	_request: express.Request,
	response: express.Response
) => {
	try {
		const update = await queryDb(
			'UPDATE Profiili SET idprofiili = ?, etunimi = ?, sukunimi = ?, puhelinnumero = ?, kuvaus = ?, mitaetsii = ?, koulutusala = ?, opintovuosi = ?, julkisuus = ?, Kayttaja = ?_sahkoposti = ?, Koulu = ?_idKoulu = ?, Paikkakunta = ?_idPaikkakunta = ?, kuva = ? WHERE idprofiili = ?',
			_request.body
		);

		response.status(200).json({
			message: 'Updated profile succesfully',
			success: true,
			update,
		});
	} catch (error: unknown) {
		console.error(error);
		errorHandler(error);
	}
};

export const updateProfileColumn = async (
	_request: express.Request,
	response: express.Response
) => {
	try {
		const update = await queryDb(
			'UPDATE Profiili SET ? = ? WHERE idprofiili = ?',
			[_request.params.column, _request.params.value, _request.params.id]
		);
		response.status(200).json({
			message: 'Updated profile succesfully',
			success: true,
			update,
		});
	} catch (error: unknown) {
		errorHandler(error);
	}
};

export const deleteProfile = async (
	_request: express.Request,
	response: express.Response
) => {
	try {
		const del = await queryDb('DELETE FROM Profiili WHERE idprofiili = ?', [
			_request.params.id,
		]);
		response.status(200).json({
			message: 'Deleted profile succesfully',
			success: true,
			del,
		});
	} catch (error: unknown) {
		errorHandler(error);
	}
};

export const findProfileSkills = async (
	_request: express.Request,
	response: express.Response
) => {
	try {
		const data = queryDb(
			'SELECT * FROM ProfiiliOsaaminen INNER JOIN Osaaminen ON taitoid=Taito_taitoid WHERE Profiili_idprofiili = ? ;',
			[_request.params.id]
		);

		response.status(200).json(data);
	} catch (error: unknown) {
		errorHandler(error);
	}
};

export const addSkill = async (
	_request: express.Request,
	response: express.Response
) => {
	try {
		// Check if profile already have skill provided in request
		const skillExists = await queryDb(
			'SELECT * FROM ProfiiliOsaaminen WHERE Profiili_idprofiili = ?',
			[_request.params.profileid]
		);

		if (Array.isArray(skillExists) && skillExists.length <= 0) {
			// If profile doesn't have skill insert to ProfiiliOsaaminen table
			const profileSkillInsert = await queryDb(
				'INSERT INTO ProfiiliOsaaminen VALUES (?, (SELECT taitoid FROM Osaaminen WHERE nimi = ?))',
				[_request.params.profileid, _request.params.skillname]
			);

			response.status(200).json({
				profileSkillInsert,
			});
		} else if (skillExists) {
			throw new Error(
				'Profile already has skill ' + String(_request.params.skillname)
			);
		}
	} catch (error: unknown) {
		errorHandler(error);
	}
};
