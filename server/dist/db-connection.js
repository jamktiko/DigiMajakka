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
const node_process_1 = __importDefault(require("node:process"));
// Import mysql library
const mysql_1 = __importDefault(require("mysql"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let pool;
// Function invokes as soon as file is imported
(function () {
    try {
        // Create connection pool to database server
        // pooling allows multithreaded connections to database
        pool = mysql_1.default.createPool({
            connectionLimit: 1,
            host: node_process_1.default.env.HOST,
            user: node_process_1.default.env.DB_USER,
            password: node_process_1.default.env.DB_PASSWORD,
            database: node_process_1.default.env.DB,
        });
        // If error occurs when connecting catch it
    }
    catch (error) {
        console.error(error);
        throw new Error('Error occured when initializing pool');
    }
})();
module.exports = pool;
