"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Imports for error handlers
// import createError from 'http-errors';
// import type {ErrorRequestHandler} from 'express';
const profile_js_1 = __importDefault(require("./routes/profile.js"));
// Usage of environment varaibles
dotenv_1.default.config();
const app = (0, express_1.default)();
// Necessary middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// Take routes in use
app.use('/profiles', profile_js_1.default);
module.exports = app;
