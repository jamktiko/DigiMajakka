/* eslint-disable @typescript-eslint/comma-dangle */
import process from 'node:process';
// Import mysql library
import mysql from 'mysql';
import * as dotenv from 'dotenv';

dotenv.config();

// Create mysql connection pool
const pool: mysql.Pool = mysql.createPool({
	connectionLimit: 1,
	host: process.env.HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB,
});

// Type for database query return object field
type ResultField = string | boolean | number;
// Type for database query return object
type DbResult = Record<string, ResultField>;
/**
 * Function which handles queries to database
 * @param query sql query for database
 * @param parameters optional parameters for sql query. For example id.
 * @returns Returns resolved promise which contains data from sql query.
 */
const queryDb = async (query: string, parameters: any[]) => {
	try {
		// If pool haven't been created throw error
		if (!pool) {
			throw new Error('Cannot find mysql pool');
		} else if (pool) {
			// Return promise (resolved or rejected) which has executed teh query provided in its parameters
			return await new Promise<[DbResult]>((resolve, reject) => {
				// Send query to database with parameters
				pool.query(query, parameters, (error: unknown, result) => {
					if (error) {
						console.error(error);

						reject(error);
						throw new Error('Failed to execute query');
					} else {
						// Check that query doesn't return undefined
						if (typeof result === 'undefined') {
							reject(
								new TypeError('Query returned undefined value')
							);
							throw new TypeError(
								'Query returned undefined value'
							);
						}

						console.log('Query executed successfully');
						// In case of successfull query resolve promise wiht result
						resolve(result);
					}
				});
			});
		}

		throw new Error('error when trying to query database');
	} catch (error: unknown) {
		console.error(error);
		// Throw error forward to express error handler
		throw error;
	}
};

export default queryDb;
