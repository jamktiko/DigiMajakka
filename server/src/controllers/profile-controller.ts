import type express from 'express';
import queryDb from '../db-connection';
import * as validation from '../validators/validation';
import type Profile from '../models/profile-model';
import CustomError from '../custom-error';
import convertBodyToQueryFormat from '../functions/convert-body-to-update-string';
import type {IAuthenticatedRequest} from '../middlewares/auth';

const profileController = {
  // Function to return all profiles
  async findAll(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb(
        'SELECT * FROM UserProfile WHERE public = true;',
        [],
      );
      console.log(data);

      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },

  // Return one profile by specific id
  async findById(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb(
        'SELECT * FROM UserProfile WHERE userprofileid = ?',
        [_request.params.profileid],
      );

      if (data.length <= 0) {
        throw new Error('No profile found with given id');
      }
      console.log(data);

      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },

  // Insert profile into database
  async createProfile(
    _request: IAuthenticatedRequest,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      if (typeof _request.user === 'undefined') {
        throw new Error('User does not exist');
      }
      console.log(_request.user);

      // Find users data and citys name that users school is in
      const userdata = await queryDb(
        'SELECT UA.email, UA.School_name AS schoolname, SC.City_name AS cityname FROM UserAccount UA INNER JOIN SchoolCity SC ON SC.School_name=UA.School_name WHERE UA.email = ?;',
        [_request.user.email],
      );

      if (typeof userdata === 'undefined' || !userdata.length) {
        throw new Error('User does not exist');
      }
      // Take users data from array
      const user = userdata[0];

      // Check that user object has specified keys
      if ('email' in user && 'cityname' in user && 'schoolname' in user) {
        // Template profile with placeholder data
        const profile: Profile = {
          firstname: 'Etunimi',
          familyname: 'Sukunimi',
          phonenumber: 'Puhelinnumero',
          description: 'Kuvaus',
          lookingfor: 'Mitä etsit',
          studyfield: 'Koulutusala',
          yearofstudy: 1,
          publicity: false,
          picturelink: '',
          email: '',
          cityname: String(user.cityname),
          accountemail: String(user.email),
          schoolname: String(user.schoolname),
        };

        // Insert placeholder data to users profile
        const insertedProfile = await queryDb(
          'INSERT INTO UserProfile (firstname, familyname, phonenumber, aboutme, lookingfor, studyfield, yearofstudy, public, picturelink, email, City_name, UserAccount_email, UserAccount_School_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          Object.values(profile),
        );

        console.log(insertedProfile);

        response.status(201).json({
          message: 'Profile created succesfully',
          success: true,
        });
      } else {
        throw new TypeError('Error when trying to create new profile');
      }
    } catch (error: unknown) {
      next(error);
    }
  },

  // Updates profile
  async updateProfile(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      // Check if phone number is in valid format
      if (
        _request.body.phonenumber &&
        !validation.validatePhoneNumber(_request.body.phonenumber)
      ) {
        throw new CustomError('Phonenumber is not valid', 400);
      }
      // Check that email is in valid format
      if (
        _request.body.email &&
        !validation.validateEmail(_request.body.email)
      ) {
        throw new CustomError('Email is not valid', 400);
      }

      // Convert request body to sql query and query parameters
      // Convert function is used here because fields that user wants to update is random
      // Because of this constant sql query cannot handle all requests
      const {sql, sqlparams} = convertBodyToQueryFormat(
        _request,
        'UserProfile',
        'userprofileid',
      );

      const update = await queryDb(sql, [
        ...sqlparams,
        _request.params.profileid,
      ]);

      console.log('Update succesfull');

      console.log(update);

      response.status(200).json({
        message: 'Updated profile succesfully',
        success: true,
      });
    } catch (error: unknown) {
      next(error);
    }
  },

  // Deletes profile by id
  async deleteProfile(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      // Delete skills of a profile
      const delSkills = await queryDb(
        'DELETE FROM UserProfileSkills WHERE UserProfile_userprofileid = ?;',
        [_request.params.profileid],
      );
      // Delete links of a profile
      const delLinks = await queryDb(
        'DELETE FROM Links WHERE UserProfile_userprofileid = ?;',
        [_request.params.profileid],
      );
      // delete profile
      const delProfile = await queryDb(
        'DELETE FROM UserProfile WHERE userprofileid = ?',
        [_request.params.profileid],
      );

      console.log(delProfile);
      console.log(delLinks);
      console.log(delSkills);
      response.status(200).json({
        message: 'Deleted profile succesfully',
        success: true,
      });
    } catch (error: unknown) {
      next(error);
    }
  },

  // Find profile by user email
  async findByEmail(
    _request: IAuthenticatedRequest,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      let userEmail = '';

      if (_request.user && typeof _request.user.email === 'string') {
        userEmail = _request.user.email;
      } else {
        throw new Error('Token is not valid or email not received in token');
      }

      const data = await queryDb(
        'SELECT * FROM UserProfile WHERE UserAccount_email = ?',
        [userEmail],
      );

      if (data.length <= 0) {
        throw new Error('No profile found with given email');
      }

      console.log(data);

      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },
};
export default profileController;
