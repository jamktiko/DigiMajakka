"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
// eslint-disable-next-line new-cap
const indexRouter = express_1.default.Router();
indexRouter.get('/', (_request, response) => {
    response.send('Hello World!');
});
module.exports = indexRouter;
