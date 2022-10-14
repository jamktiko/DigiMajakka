"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = void 0;
const db_connection_1 = __importDefault(require("../db-connection"));
const error_handler_1 = __importDefault(require("../error-handler"));
const findAll = (_request, response) => {
    try {
        const data = (0, db_connection_1.default)('SELECT * FROM Tyoilmoitus;', []);
        response.status(200).json(data);
    }
    catch (error) {
        (0, error_handler_1.default)(error);
    }
};
exports.findAll = findAll;
