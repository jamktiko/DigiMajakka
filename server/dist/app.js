"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Imports for error handlers
// import createError from 'http-errors';
// import type {ErrorRequestHandler} from 'express';
const index_js_1 = __importDefault(require("./routes/index.js"));
const app = (0, express_1.default)();
// Necessary middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use('/', index_js_1.default);
module.exports = app;
