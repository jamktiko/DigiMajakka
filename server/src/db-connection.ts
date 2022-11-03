/* eslint-disable @typescript-eslint/indent */

import process from 'node:process';
// Import mysql library
import mysql from 'mysql';
import * as dotenv from 'dotenv';

dotenv.config();

// Function invokes as soon as file is imported
const pool: mysql.Pool = (function () {
	try {
		// Create connection pool to database server
		// pooling allows multithreaded connections to database
		return mysql.createPool({
			connectionLimit: 1,
			host: process.env.HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB,
		});
		// If error occurs when connecting catch it
	} catch (error: unknown) {
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
const queryDb = async (query: string, parameters: any[]) => {
	try {
		// If pool haven't been created throw error
		if (!pool) {
			throw new Error('Cannot find pool');
		} else if (pool) {
			// Return promise (resolved or rejected) which has executed teh query provided in its parameters
			return await new Promise<
				[Record<string, unknown>] | Record<string, unknown>
			>((resolve, reject) => {
				pool.query(query, parameters, (error: unknown, result) => {
					if (error) {
						reject(error);
						throw new Error('Failed to execute query');
					} else {
						resolve(result);
					}
				});
			});
		}

		throw new Error('error when trying to query database');
	} catch (error: unknown) {
		console.error(error);
		throw error;
	}
};

export default queryDb;
