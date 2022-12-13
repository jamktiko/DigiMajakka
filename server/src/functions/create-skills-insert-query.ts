import type express from 'express';
import queryDb from '../db-connection';

/**
 * Creates sill insert query from express request
 * @param {express.Request} request express request object
 * @return {string} sql query string
 */
const createSkillInsertQuery = async (request: express.Request) => {
  // Check if profile already have skill provided in request
  // Find all profiles skills
  const skillExists = await queryDb(
    'SELECT Skills_name AS name FROM UserProfileSkills WHERE Userprofile_userprofileid = ?;',
    [request.params.profileid],
  );

  // Profiles existing skill
  const oldSkills = [];

  // Put existing skills into array
  for (const skill of skillExists) {
    oldSkills.push(skill.name);
  }

  // Array for new skills to insert
  const newSkills = [];

  // Array for skills provided in reqeust
  const skillsToInsert = request.body.skills || [];

  // Construct strings for sql query and put tehm into array
  // Array will be filled with sql inserts in format [(UserProfile id, skillname)]
  for (const skill of skillsToInsert) {
    // Check that profile does not already have skill
    if (!oldSkills.includes(skill)) {
      // Check that loop is not in last element of array
      // If in last element "," is not needed at the end of string
      if (skillsToInsert.indexOf(skill) + 1 === skillsToInsert.length) {
        newSkills.push(
          '(' +
            '"' +
            String(skill) +
            '"' +
            ', ' +
            String(request.params.profileid) +
            ')',
        );
      } else {
        newSkills.push(
          '(' +
            '"' +
            String(skill) +
            '"' +
            ', ' +
            String(request.params.profileid) +
            '), ',
        );
      }
    }
  }

  // Check that there are new skills to insert
  if (newSkills.length > 0) {
    // Construct sql query from new skills array and sql string
    let sql = 'INSERT INTO UserProfileSkills VALUES ';

    for (const x of newSkills) {
      sql += String(x);
    }

    sql += ';';
    return sql;
  } else {
    return false;
  }
};

export default createSkillInsertQuery;
