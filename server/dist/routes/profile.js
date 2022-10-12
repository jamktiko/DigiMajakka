"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const profile_controller_js_1 = require("../controllers/profile-controller.js");
// eslint-disable-next-line new-cap
const profileRouter = express_1.default.Router();
profileRouter.get('/findAll', profile_controller_js_1.findAll);
profileRouter.get('/findById/:id', profile_controller_js_1.findById);
module.exports = profileRouter;
