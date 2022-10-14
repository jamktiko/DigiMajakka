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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/comma-dangle */
const node_process_1 = __importDefault(require("node:process"));
// Import mysql library
const mysql_1 = __importDefault(require("mysql"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Function invokes as soon as file is imported
const pool = (function () {
    try {
        // Create connection pool to database server
        // pooling allows multithreaded connections to database
        return mysql_1.default.createPool({
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
// Function which handles queries to database
/**
 *
 * @param query sql query for database
 * @param parameters optional parameters for sql query. For example id.
 * @returns Returns resolved promise which contains data from sql query.
 */
const queryDb = (query, parameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!pool) {
            throw new Error('Cannot find pool');
        }
        else if (pool) {
            return yield new Promise((resolve, reject) => {
                pool.query(query, parameters, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
            throw new Error('Failed to execute query');
        }
        else {
            console.error(error);
            throw new Error('Failed to execute query');
        }
    }
});
exports.default = queryDb;
