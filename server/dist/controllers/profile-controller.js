"use strict";
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
exports.findById = exports.findAll = void 0;
const db_connection_js_1 = __importDefault(require("../db-connection.js"));
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
