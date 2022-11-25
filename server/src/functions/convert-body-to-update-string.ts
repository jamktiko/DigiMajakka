/* eslint-disable @typescript-eslint/comma-dangle */
import type express from 'express';

/**
 *
 * @param request express request
 * @return object which contains sql string and values in array used in mysql.query() function
 */

const convertBodyToQueryFormat = (
  request: express.Request,
  tablename: string,
  idcolumn: string,
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
  let updateString = 'UPDATE ' + tablename + ' SET ';
  // Add each of keys(column names) one by one into updatestring
  for (const x of keys) {
    updateString += String(x) + ' = ?';
    // If added last key then insert just ' ' otherwise ',' is needed
    updateString += keys.indexOf(x) === keys.length - 1 ? ' ' : ', ';
  }

  // Last part of update string where you specify profile id
  updateString += 'WHERE ' + idcolumn + ' = ?;';

  return {
    sql: updateString,
    sqlparams: values,
  };
};

export default convertBodyToQueryFormat;
