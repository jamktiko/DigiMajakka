"use strict";
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/comma-dangle */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfileColumn = exports.updateProfile = exports.createProfile = exports.findById = exports.findAll = void 0;
const db_connection_1 = __importDefault(require("../db-connection"));
const profile_model_1 = __importDefault(require("../models/profile-model"));
const error_handler_1 = __importDefault(require("../error-handler"));
// Return all profiles from database
const findAll = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, db_connection_1.default)('SELECT * FROM Profiili;', []);
        response.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        response.status(400).json({
            message: error,
        });
    }
});
exports.findAll = findAll;
// Return one profile by specific id
const findById = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, db_connection_1.default)('SELECT * FROM Profiili WHERE idprofiili = ?', [_request.params.id]);
        response.status(200).json(data);
    }
    catch (error) {
        (0, error_handler_1.default)(error);
    }
});
exports.findById = findById;
// Insert profile into database
const createProfile = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Profile needs to be validated before inserting it into databse
        // Function profileValidator return opbject which has validated profile and information if validation passed
        const profile = (0, profile_model_1.default)(_request.body);
        if (!profile.valid) {
            throw new Error('Profile not valid');
        }
        else if (profile.valid) {
            const insertedProfile = yield (0, db_connection_1.default)('INSERT INTO Profiili (idprofiili, etunimi, sukunimi, puhelinnumero, kuvaus, mitaetsii, koulutusala, opintovuosi, julkisuus, Kayttaja_sahkoposti, Koulu_idKoulu, Paikkakunta_idPaikkakunta, kuva) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', Object.values(profile.profile));
            response.status(201).json({
                message: 'Profile created succesfully',
                profile: insertedProfile,
            });
        }
    }
    catch (error) {
        (0, error_handler_1.default)(error);
    }
});
exports.createProfile = createProfile;
// Updates all fields of profile. Values taken from request body.
const updateProfile = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield (0, db_connection_1.default)('UPDATE Profiili SET idprofiili = ?, etunimi = ?, sukunimi = ?, puhelinnumero = ?, kuvaus = ?, mitaetsii = ?, koulutusala = ?, opintovuosi = ?, julkisuus = ?, Kayttaja = ?_sahkoposti = ?, Koulu = ?_idKoulu = ?, Paikkakunta = ?_idPaikkakunta = ?, kuva = ? WHERE idprofiili = ?', _request.body);
        response.status(200).json({
            message: 'Updated profile succesfully',
            update,
        });
    }
    catch (error) {
        console.error(error);
        (0, error_handler_1.default)(error);
    }
});
exports.updateProfile = updateProfile;
const updateProfileColumn = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield (0, db_connection_1.default)('UPDATE Profiili SET ? = ? WHERE idprofiili = ?', [_request.params.column, _request.params.value, _request.params.id]);
        response.status(200).json({
            message: 'Updated profile succesfully',
            update,
        });
    }
    catch (error) {
        (0, error_handler_1.default)(error);
    }
});
exports.updateProfileColumn = updateProfileColumn;
const deleteProfile = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const del = (0, db_connection_1.default)('DELETE FROM Profiili WHERE idprofiili = ?', [
            _request.params.id,
        ]);
        response.status(200).json({
            message: 'Deleted profile succesfully',
            del,
        });
    }
    catch (error) {
        (0, error_handler_1.default)(error);
    }
});
exports.deleteProfile = deleteProfile;
