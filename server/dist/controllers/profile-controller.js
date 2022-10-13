"use strict";
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
exports.createProfile = exports.findById = exports.findAll = void 0;
const db_connection_js_1 = __importDefault(require("../db-connection.js"));
const profile_model_js_1 = __importDefault(require("../models/profile-model.js"));
// Return all profiles from database
const findAll = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, db_connection_js_1.default)('SELECT * FROM Profiili;', []);
    response.json(data);
});
exports.findAll = findAll;
// Return one profile by specific id
const findById = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, db_connection_js_1.default)('SELECT * FROM Profiili WHERE idprofiili = ?', [
        _request.params.id,
    ]);
    response.send(data);
});
exports.findById = findById;
// Insert profile into database
const createProfile = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = (0, profile_model_js_1.default)(_request.body);
        if (!profile.valid) {
            throw new Error('Profile not valid');
        }
        else if (profile.valid) {
            const insertedProfile = yield (0, db_connection_js_1.default)('INSERT INTO Profiili (idprofiili, etunimi, sukunimi, puhelinnumero, kuvaus, mitaetsii, koulutusala, opintovuosi, julkisuus, Kayttaja_sahkoposti, Koulu_idKoulu, Paikkakunta_idPaikkakunta, kuva) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', Object.values(profile));
            response.status(201).json({
                message: 'Profile created succesfully',
                profile: insertedProfile,
            });
        }
    }
    catch (error) {
        console.log(error);
        response
            .status(400)
            .json('Error when creating profile: ' + String(error));
    }
});
exports.createProfile = createProfile;
