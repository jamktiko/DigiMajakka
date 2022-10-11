import process from 'node:process';
// Import mysql library
import mysql from 'mysql';
import * as dotenv from 'dotenv';

dotenv.config();

let pool: mysql.Pool;
// Function invokes as soon as file is imported
(function () {
	try {
		// Create connection pool to database server
		// pooling allows multithreaded connections to database
		pool = mysql.createPool({
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

export = pool;
