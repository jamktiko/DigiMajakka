"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const db_connection_js_1 = __importDefault(require("../db-connection.js"));
const test = (
// eslint-disable-next-line prettier/prettier
callback) => {
    return db_connection_js_1.default.query('SELECT * FROM Paikkakunta;', callback);
};
module.exports = test;
