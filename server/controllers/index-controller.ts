/* eslint-disable prettier/prettier */
import pool from '../db-connection.js';

const test = (
	callback: (error: unknown, result: Record<string, unknown>) => void
) => {
	return pool.query('SELECT * FROM Paikkakunta;', callback);
};

export = test;
