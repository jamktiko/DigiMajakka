"use strict";
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
exports.findAll = void 0;
const db_connection_1 = __importDefault(require("../db-connection"));
const error_handler_1 = __importDefault(require("../error-handler"));
const findAll = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, db_connection_1.default)('SELECT * FROM Tyoilmoitus;', []);
        response.status(200).json(data);
    }
    catch (error) {
        (0, error_handler_1.default)(error);
    }
});
exports.findAll = findAll;
