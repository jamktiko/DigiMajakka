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

const queryDb = async (query: string, parameters: unknown[]) => {
  return new Promise<[DbResult]>((resolve, reject) => {
    // Get pool connection
    pool.getConnection(async (error, connection) => {
      // If error release connection and throw error forward
      if (error) {
        connection.release();
        throw error;
      }

      // Send query to database with parameters
      connection.query(query, parameters, (error: unknown, result) => {
        // If error release connection and reject promise
        if (error) {
          connection.release();
          reject(error);
        } else {
          // Check that query doesn't return undefined
          // In case of undefined release connection and reject promise
          if (typeof result === 'undefined') {
            connection.release();
            reject(new TypeError('Query returned undefined value'));
          }

          console.log('Query executed successfully');
          // Release connection after successfull query
          connection.release();
          // In case of successfull query resolve promise wiht result
          resolve(result);
        }
      });
    });
  });
};

export default queryDb;
