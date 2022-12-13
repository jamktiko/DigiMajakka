import type express from 'express';
import CustomError from '../custom-error';
import queryDb from '../db-connection';
import createSkillDeleteQuery from '../functions/create-skills-delete-sql-query';
import createSkillInsertQuery from '../functions/create-skills-insert-query';
import {IAuthenticatedRequest} from '../middlewares/auth';

const skillC = {
  // Find Skill by skill name
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
      const sql = await createSkillInsertQuery(_request);

      if (sql) {
        const result = await queryDb(sql, []);

        console.log(result);

        response.status(201).json({
          success: true,
          message: 'Inserted new skills successfully',
        });
      } else {
        // If all skills tried to insert already existed in profile just return ok status and message
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
  // Function to delete skill from profile
  async deleteSkillFromProfile(
    _request: IAuthenticatedRequest,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      if (typeof _request.user === 'undefined') {
        throw new CustomError('Error with user authentication', 403);
      }

      // Find users profile
      // const profile = await queryDb(
      //   'SELECT userprofileid FROM UserProfile WHERE UserAccount_email = ?',
      //   [_request.user.email],
      // );
      // // Take profiles id to variable
      // const profileid = profile[0].userprofileid;

      // Create delete query
      const sql = createSkillDeleteQuery(_request.body.skills.length);

      const result = await queryDb(sql, [
        _request.params.profileid,
        ..._request.body.skills,
      ]);

      console.log(result);

      response.status(200).json({
        success: true,
        message: 'Deleted skills succesfully',
      });
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default skillC;
