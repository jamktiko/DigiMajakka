/* eslint-disable require-jsdoc */
/* eslint-disable operator-linebreak */
import http from 'node:http';
import process from 'node:process';
import app from '../app.js';

import dotenv from 'dotenv';
dotenv.config();

type PortType = number | string | boolean;

const port: PortType = normalizePort(process.env.PORT ?? '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalizes port number
 * @param {string} value
 * @return {string | number | boolean} port number or named pipe
 */
function normalizePort(value: string) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw new Error(error);
  }

  const bind =
    typeof port === 'string' ? 'Pipe ' + port : 'Port ' + String(port);

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
  const bind =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    typeof addr === 'string' ? 'pipe ' + addr : 'port ' + String(addr!.port);
  console.log('Listening on ' + bind);
}
