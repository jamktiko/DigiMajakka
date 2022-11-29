/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/comma-dangle */

/* eslint-disable @typescript-eslint/naming-convention */
import process from 'node:process';
import dotenv from 'dotenv';
dotenv.config();
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

// Create new instance of cognitoUserPool to connect to cognito
const userPool = new CognitoUserPool({
  UserPoolId: process.env.USER_POOL_ID ?? '',
  ClientId: process.env.CLIENT_ID ?? '',
});

/**
 *
 * @param email users email
 * @param profileid users id in database
 * @returns attributelist that is needed for cognito signup
 */

// New CognitoUserAttribute({
// 	Name: 'profileid',
// 	Value: String(profileid),
// })

class CognitoHelper {
  public userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.USER_POOL_ID ?? '',
      ClientId: process.env.CLIENT_ID ?? '',
    });
  }

  /**
   * Function signs new user to cognito and database
   * @param {string} email users email
   * @param {string} password users password
   * @return {Promise} resolved promise
   */
  async signUp(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const attributeList: CognitoUserAttribute[] = [
        new CognitoUserAttribute({
          Name: 'email',
          Value: email,
        }),
      ];

      // Signup user to cognito
      this.userPool.signUp(
        email,
        password,
        attributeList,
        [],
        (error, result) => {
          if (error) {
            reject(error);
          }

          // If signup was succesfull return username
          resolve(result?.user.getUsername());
        },
      );
    });
  }

  /**
   * Function that confirms user registration with code that cognito sent via email
   * @param email users email
   * @param code users confirmation code received via email
   * @return resolved promise
   */
  async confirmSignUp(email: string, code: string) {
    // Create new instance of CognitoUser
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      // Use cognitoUser class method to verify confirmation code
      cognitoUser.confirmRegistration(code, true, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(JSON.stringify(result));
      });
    });
  }

  /**
   * Function to resend confirmation code to user
   * @param email users email
   * @return resolved promise
   */
  async resendConfirmCode(email: string) {
    // Create new instance of CognitoUser

    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      // Use class method to resend confirmation code
      cognitoUser.resendConfirmationCode((error, result) => {
        if (error) {
          reject(error);
        }

        resolve(JSON.stringify(result));
      });
    });
  }

  /**
   * Function to sign user in
   * @param email users registered email
   * @param password users password
   * @return resolved promise
   */
  async signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        // If sign in was success check if user has confirmed their account with code
        onSuccess(session, userConfirmationNecessary) {
          if (userConfirmationNecessary) {
            resolve({userConfirmationNecessary});
          }

          // In case of everything is ok send token of signed in user forward

          resolve({
            accessToken: session.getAccessToken().getJwtToken(),
          });
        },
        onFailure(error) {
          reject(error);
        },
      });
    });
  }

  /**
   * Function that signs user out
   * @param email users email
   * @return resolved promise
   */
  async signOut(email: string) {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.signOut(() => {
        resolve('Signed out successfully');
      });
    });
  }

  /**
   * Deletes authenticated user from cognito and from database
   * @param email users email
   * @param password users password fro authentication
   * @return promise
   */
  async deleteUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      // Create new instance of cognitoUser
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
      // Details for authentication
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      // Try to authenticate user
      cognitoUser.authenticateUser(authenticationDetails, {
        // If sign in was success check if user has confirmed their account with code
        onSuccess(_session, userConfirmationNecessary) {
          if (userConfirmationNecessary) {
            resolve({userConfirmationNecessary});
          }

          // On successfull login delete user
          cognitoUser.deleteUser((error, result) => {
            if (error) {
              reject(error);
            }

            console.log(result);

            resolve(result);
          });
        },
        onFailure(error) {
          reject(error);
        },
      });
    });
  }

  // Function to start password reset
  // This will send email with confirmation code to user
  async resetPassword(email: string) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.forgotPassword({
        onSuccess: function (result) {
          console.log('call result: ' + result);
          resolve(result);
        },
        onFailure: function (error) {
          reject(error);
        },
      });
    });
  }

  /**
   * Completes password reset request
   * @param {string} email users email
   * @param {string} confirmationCode password reset confirmation code received via email
   * @param {string} newPassword new password provided by user
   * @returns promise
   */
  async confirmPassword(
    email: string,
    confirmationCode: string,
    newPassword: string,
  ) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
      cognitoUser.confirmPassword(confirmationCode, newPassword, {
        onFailure(error) {
          reject(error);
        },
        onSuccess() {
          resolve('Password reset success');
        },
      });
    });
  }
}

export default CognitoHelper;
