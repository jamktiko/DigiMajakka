import type express from 'express';
import queryDb from '../db-connection';

const skillC = {
  // Find Skill by skill id
  async findOne(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb('SELECT * FROM Skills WHERE name = ?;', [
        _request.params.name,
      ]);

      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },
  // Find all skills
  async findAll(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb('SELECT * FROM Skills;', []);
      console.log(data);

      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },
  // Finds skills that profile with specific id has
  async findProfileSkills(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb(
        'SELECT Skills_name AS name FROM UserProfileSkills WHERE Userprofile_userprofileid = ?;',
        [_request.params.profileid],
      );
      console.log(data);

      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },

  // Adds skill to profile with specific id
  async addSkill(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      // Check if profile already have skill provided in request
      // Find all profiles skills
      const skillExists = await queryDb(
        'SELECT Skills_name AS name FROM UserProfileSkills WHERE Userprofile_userprofileid = ?;',
        [_request.params.profileid],
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
      const skillsToInsert = _request.body.skills || [];

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
                String(_request.params.profileid) +
                ')',
            );
          } else {
            newSkills.push(
              '(' +
                '"' +
                String(skill) +
                '"' +
                ', ' +
                String(_request.params.profileid) +
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

        const result = await queryDb(sql, []);

        console.log(result);

        response.status(201).json({
          success: true,
          message: 'Inserted new skills successfully',
        });
      } else {
        // If all skills tried to insert alreade existed in profile just return ok status and message
        console.log('All skills were already assigned to profile');

        response.status(200).json({
          success: true,
          message:
            'No new skills inserted because all provided skills were already assigned to profile',
        });
      }
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default skillC;
