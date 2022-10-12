/* eslint-disable @typescript-eslint/comma-dangle */

import type express from 'express';
import queryDb from '../db-connection.js';
import profileValidator from '../models/profile-model.js';

// Return all profiles from database
export const findAll = async (
	_request: express.Request,
	response: express.Response
) => {
	const data = await queryDb('SELECT * FROM Profiili;', []);
	response.json(data);
};

// Return one profile by specific id
export const findById = async (
	_request: express.Request,
	response: express.Response
) => {
	const data = await queryDb('SELECT * FROM Profiili WHERE idprofiili = ?', [
		_request.params.id,
	]);
	response.send(data);
};

// Insert profile into database
export const createProfile = async (
	_request: express.Request,
	response: express.Response
) => {
	try {
		const profile = profileValidator(_request.body);
		if (!profile.valid) {
			throw new Error('Profile not valid');
		} else if (profile.valid) {
			const insertedProfile = await queryDb(
				'INSERT INTO Profiili (idprofiili, etunimi, sukunimi, puhelinnumero, kuvaus, mitaetsii, koulutusala, opintovuosi, julkisuus, Kayttaja_sahkoposti, Koulu_idKoulu, Paikkakunta_idPaikkakunta, kuva) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
				Object.values(profile)
			);
			response.status(201).json({
				message: 'Profile created succesfully',
				profile: insertedProfile,
			});
		}
	} catch (error: unknown) {
		console.log(error);
		response
			.status(400)
			.json('Error when creating profile: ' + String(error));
	}
};
