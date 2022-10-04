"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const node_process_1 = __importDefault(require("node:process"));
const app_js_1 = __importDefault(require("../app.js"));
const port = normalizePort((_a = node_process_1.default.env.PORT) !== null && _a !== void 0 ? _a : '3000');
app_js_1.default.set('port', port);
const server = node_http_1.default.createServer(app_js_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(value) {
    const port = Number.parseInt(value, 10);
    if (Number.isNaN(port)) {
        // Named pipe
        return value;
    }
    if (port >= 0) {
        // Port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw new Error(error);
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + String(port);
    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            throw new Error(bind + ' requires elevated privileges');
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            throw new Error(bind + ' is already in use');
        default:
            throw new Error(error);
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + String(addr.port);
    console.log('Listening on ' + bind);
}
