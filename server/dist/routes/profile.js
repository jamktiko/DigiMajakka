"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/comma-dangle */
const express_1 = __importDefault(require("express"));
const profileC = __importStar(require("../controllers/profile-controller"));
// eslint-disable-next-line new-cap
const profileRouter = express_1.default.Router();
// Route to get all profiles
profileRouter.get('/findAll', profileC.findAll);
// Route to get profile with specific id
profileRouter.get('/findById/:id', profileC.findById);
// Route to post profile
profileRouter.post('/create', profileC.createProfile);
// Route to update profile
profileRouter.put('/update', profileC.updateProfile);
// Update one column of profile
profileRouter.put('/updateOne/:id/:column/:value', profileC.updateProfileColumn);
module.exports = profileRouter;