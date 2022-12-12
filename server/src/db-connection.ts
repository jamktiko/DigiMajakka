import process from 'node:process';
import dotenv from 'dotenv';
dotenv.config();
// Import mysql library
import mysql from 'mysql';

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
      // If error throw error forward
      if (error) {
        throw error;
      } else {
        console.log('Db connection successfull');
      }

      // Send query to database with parameters
      connection.query(query, parameters, (error: unknown, result) => {
        // If error reject promise
        if (error) {
          reject(error);
        } else {
          // Check that query doesn't return undefined
          // In case of undefined release connection and reject promise
          if (typeof result === 'undefined') {
            connection.release();
            reject(new TypeError('Query returned undefined value'));
          }

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
