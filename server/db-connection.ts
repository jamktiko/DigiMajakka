/* eslint-disable @typescript-eslint/comma-dangle */
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
		if (!pool) {
			throw new Error('Cannot find pool');
		} else if (pool) {
			return await new Promise((resolve, reject) => {
				pool.query(
					query,
					parameters,
					(error: unknown, result: Record<string, unknown>) => {
						if (error) {
							reject(error);
						} else {
							resolve(result);
						}
					}
				);
			});
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error);
			throw new Error('Failed to execute query');
		} else {
			console.error(error);
			throw new Error('Failed to execute query');
		}
	}
};

export default queryDb;
