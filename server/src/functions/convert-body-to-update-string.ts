/* eslint-disable @typescript-eslint/comma-dangle */
import type express from 'express';

/**
 * Converts request body to sql query string ('') and parameter values ([values]) used in mysql.query(query, parameters) method
 * @param {express.Request} request express request
 * @param {string} tablename table in database which query will affect
 * @param {string} idcolumnname Primary keys name in that database table
 * @return {object} object which contains sql string and values in array used in mysql.query() function
 */

const convertBodyToQueryFormat = (
  request: express.Request,
  tablename: string,
  idcolumnname: string,
) => {
  if (!request.body) {
    throw new Error('No body received in request');
  }

  // Take values values from object to array
  const values: unknown[] = Object.values(request.body);
  // Take keys(columns) from object to array
  const keys = Object.keys(request.body);

  // Updatestring will contain update query
  // It is contructed from values and keys separated from object
  // This allows to use this route to update any number of columns in table row

  // Start string of the query
  let sql = 'UPDATE ' + tablename + ' SET ';
  // Add each of keys(column names) one by one into updatestring
  for (const x of keys) {
    sql += String(x) + ' = ?';
    // If added last key then insert just ' ' otherwise ',' is needed
    sql += keys.indexOf(x) === keys.length - 1 ? ' ' : ', ';
  }

  // Last part of update string where you specify profile id
  sql += 'WHERE ' + idcolumnname + ' = ?;';

  return {
    sql: sql,
    sqlparams: values,
  };
};

export default convertBodyToQueryFormat;
