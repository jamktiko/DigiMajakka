"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const index_controller_js_1 = __importDefault(require("../controllers/index-controller.js"));
// eslint-disable-next-line new-cap
const indexRouter = express_1.default.Router();
indexRouter.get('/', (_request, response) => {
    (0, index_controller_js_1.default)((error, result) => {
        if (error)
            throw new Error(error);
        console.log(typeof error);
        response.send(result);
    });
});
module.exports = indexRouter;
