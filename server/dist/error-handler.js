"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler = (error) => {
    console.error(error);
    express_1.response.status(200).json({
        message: error,
    });
};
exports.default = errorHandler;
