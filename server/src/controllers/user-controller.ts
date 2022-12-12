import type express from 'express';
import CustomError from '../custom-error';
import queryDb from '../db-connection';
import CognitoHelper from '../service-helpers/cognito-helper';

const cognitoHelper = new CognitoHelper();

const userC = {
  // Function that signs user up to cognito and database
  async singUp(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      // Check that are required fields are provided in the body
      if (!('email' in _request.body) || !('password' in _request.body)) {
        throw new Error(
          'Did not receive all required fields in body (email, password)',
        );
      }
      // Separate email end after @ from email string
      const userEmailEnd = _request.body.email.slice(
        _request.body.email.indexOf('@'),
      );

      // Find if school with that email end exists
      const schooldata = await queryDb(
        'SELECT * FROM School WHERE emailend = ?;',
        [userEmailEnd],
      );

      // If school does not exists throw error
      if (!schooldata.length) {
        throw new CustomError(
          'School with email ' + userEmailEnd + ' does not exists',
          400,
        );
      }

      // Try to insert account information to database and save answer to dbresult
      const dbresult = await queryDb(
        'CALL createUser(?,?,?);',
        // Admin field is set to false a default because no admin functionality is implemented yet in the app
        [_request.body.email, false, schooldata[0].name],
      );
      // Try to sign up user to cognito and save ansewer to result
      const result = await cognitoHelper.signUp(
        _request.body.email,
        _request.body.password,
      );

      // Check if there are result from both cognito and database
      if (result && dbresult) {
        // If everything is ok send response to frontend
        console.log('Created user ' + String(result));

        response.status(200).json({
          success: true,
          message: 'Created user ' + String(result),
        });
      } else {
        throw new Error('Error when creating user');
      }
    } catch (error: unknown) {
      // // If there were error when creating user find if users information was inserted into database and remove that user
      // const user = await queryDb('SELECT * FROM UserAccount WHERE email=?;', [
      //   _request.body.email,
      // ]);

      // if (user.length > 0) {
      //   await queryDb('DELETE FROM UserAccount WHERE email=?;', [
      //     _request.body.email,
      //   ]);
      // }
      // Forward error to errorHandler middleware
      next(error);
    }
  },
  // Function to sign registered user in
  async signIn(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const result = await cognitoHelper.signIn(
        _request.body.email,
        _request.body.password,
      );

      response.status(200).json(result);
    } catch (error: unknown) {
      next(error);
    }
  },
  // Function to confirm signup with code that cognito has send to user via email
  async confirmSignup(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const result = await cognitoHelper.confirmSignUp(
        _request.body.email,
        _request.body.code,
      );

      response.status(200).json(result);
    } catch (error: unknown) {
      next(error);
    }
  },

  // Function to resend confirmation code
  async resendConfirmCode(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      if (!('email' in _request.body)) {
        throw new CustomError('No email received in body', 400);
      }

      const result = await cognitoHelper.resendConfirmCode(_request.body.email);

      response.status(200).json(result);
    } catch (error: unknown) {
      next(error);
    }
  },
  // Function to sign user out
  async signOut(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      if (!('email' in _request.body)) {
        throw new CustomError('No email received in body', 400);
      }

      const result = await cognitoHelper.signOut(_request.body.email);

      console.log(result);

      response.status(200).json({
        message: 'Signed user out successfully',
      });
    } catch (error: unknown) {
      next(error);
    }
  },
  // Function that deletes users data from database and cognito
  async deleteUser(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const body = _request.body;
      // Check that requierd valus are in body
      if (!('email' in body) || !('password' in body)) {
        throw new CustomError(
          'Did not receive ' + 'email' in body
            ? 'password '
            : 'email ' + 'in request body',
          400,
        );
      }

      // Take users profiles data from database
      const profiledata = await queryDb(
        'SELECT userprofileid FROM UserProfile WHERE UserAccount_email = ?;',
        [body.email],
      );

      // Take profiles id from profile data
      const profileid = profiledata[0].userprofileid;

      // Call procedure which deletes users data
      const deluser = queryDb('CALL deleteUserData(?, ?);', [
        profileid,
        body.email,
      ]);

      // Try to delete user from cognito
      const result = await cognitoHelper.deleteUser(body.email, body.password);

      console.log(result);

      console.log(deluser);

      response.status(200).json({
        succes: true,
        message: 'Deleted user successfully',
      });
    } catch (error: unknown) {
      next(error);
    }
  },
  // Function to update users school
  /*
	Because users email is validated with "@email.end" email end string provided by school user needs to update email also to correct with new school
	This leads to problem with cognito. Cognito does not allow change account username (which is email in this case) so when user changes school
	it is needed to actually delete old account and create new account with new email and school.
	*/
  async updateSchool(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      if (
        !_request.body ||
        !_request.body.oldemail ||
        !_request.body.newemail ||
        !_request.body.newschool ||
        !_request.body.password
      ) {
        throw new Error('Not all required information was provided in request');
      }

      // Find users current school
      const oldschool = await queryDb(
        'SELECT School_name AS school FROM UserAccount WHERE email = ?;',
        [_request.body.oldemail],
      );

      // Put users current school in request body. It is needed in error handling.
      _request.body.oldschool = oldschool[0].school;

      // Try to sign user in so we know that user exists in cognito
      const trySignIn = await cognitoHelper.signIn(
        _request.body.oldemail,
        _request.body.password,
      );

      if (!trySignIn) {
        throw new Error('Email or password incorrect');
      }

      // Try to update users information in database first
      // Call procedure updateUserSchool which updates users information according given parameters
      const dbupdate = await queryDb('CALL updateUserSchool(?, ?, ?);', [
        _request.body.oldemail,
        _request.body.newemail,
        _request.body.newschool,
      ]);

      // Try to delete user from cognito
      const userDelete = await cognitoHelper.deleteUser(
        _request.body.oldemail,
        _request.body.password,
      );

      // Const updateUser = await queryDb(
      // 	'UPDATE UserAccount SET email = ?, School_name = ? WHERE email = ?;',
      // 	[cognito
      // 		_request.body.newemail,
      // 		_request.body.newschool,
      // 		_request.body.oldemail,
      // 	]
      // );

      // const updateProfile = await queryDb(
      // 	'UPDATE UserProfile SET UserAccount_email = ?, UserAccount_School_name = ?, City_name = (SELECT City_name FROM SchoolCity WHERE School_name = ?) WHERE UserAccount_email = ?;',
      // 	[
      // 		_request.body.newemail,
      // 		_request.body.newschool,
      // 		_request.body.newschool,
      // 		_request.body.oldemail,
      // 	]
      // )

      // Try to register new user to cognito with new email
      const userSignup = await cognitoHelper.signUp(
        _request.body.newemail,
        _request.body.password,
      );

      if (!userDelete || !userSignup || !dbupdate) {
        throw new Error('Error when updating school');
      }

      console.log('Succesfully updated users school');

      response.status(200).json({
        success: true,
        message:
          'Succesfully changed users school to ' + _request.body.newschool,
      });
    } catch (error: unknown) {
      next(error);
    }
  },
  async resetPassword(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      // If no email received throw error
      if (!('email' in _request.body)) {
        throw new CustomError('No email received in request body', 400);
      }

      const result = await cognitoHelper.resetPassword(_request.body.email);

      console.log(result);

      response.status(200).json({
        success: true,
        message: 'Code for password reset send to users email',
      });
    } catch (error: unknown) {
      next(error);
    }
  },
  async confirmPasswordReset(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      if (
        !('email' in _request.body) ||
        !('newPassword' in _request.body) ||
        !('confirmationCode' in _request.body)
      ) {
        throw new CustomError(
          'All recuired fields not received in request body',
          400,
        );
      }

      const result = await cognitoHelper.confirmPassword(
        _request.body.email,
        _request.body.confirmationCode,
        _request.body.newPassword,
      );

      console.log(result);

      response.status(200).json({
        success: true,
        message: 'Succesfully changed users password',
      });
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default userC;
