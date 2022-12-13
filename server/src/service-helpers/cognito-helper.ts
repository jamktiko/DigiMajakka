/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/comma-dangle */

/* eslint-disable @typescript-eslint/naming-convention */
import process from 'node:process';
import dotenv from 'dotenv';
import {CognitoIdentityServiceProvider} from 'aws-sdk';
dotenv.config();
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

class CognitoHelper {
  public userPool: CognitoUserPool;
  public cognitoIdentity: CognitoIdentityServiceProvider;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.USER_POOL_ID ?? '',
      ClientId: process.env.CLIENT_ID ?? '',
    });
    this.cognitoIdentity = new CognitoIdentityServiceProvider({
      accessKeyId: process.env.COGNITO_ACCESS_KEY,
      secretAccessKey: process.env.COGNITO_SECRET_KEY,
      region: process.env.REGION,
    });
  }

  /**
   * Method that signs new user to cognito and database
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
   * Method that confirms user registration with code that cognito sent via email
   * @param {string} email users email
   * @param {string} code users confirmation code received via email
   * @return {Promise} resolved promise
   */
  async confirmSignUp(email: string, code: string) {
    // Create new instance of CognitoUser
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
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
   * Method to resend confirmation code to user
   * @param {string} email users email
   * @return {promise} resolved promise
   */
  async resendConfirmCode(email: string) {
    // Create new instance of CognitoUser

    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
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
   * Method to sign user in
   * @param {string} email users registered email
   * @param {string} password users password
   * @return {Promise} resolved promise
   */
  async signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      this.cognitoIdentity.adminGetUser(
        {
          UserPoolId: process.env.USER_POOL_ID || '',
          Username: email || '',
        },
        (error) => {
          if (error) reject(error); // an error occurred
        },
      );

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
   * Method that signs user out
   * @param {string} email users email
   * @return {Promise} resolved promise
   */
  async signOut(email: string) {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });

      cognitoUser.signOut(() => {
        resolve('Signed out successfully');
      });
    });
  }

  /**
   * Method to for authenticated user to delete their account/data from cognito and database
   * @param {string} email users email
   * @param {string} password users password fro authentication
   * @return {Promise} promise
   */
  async deleteUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      // Create new instance of cognitoUser
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
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

  /**
   * Method to start password reset workflow. This will send email with confirmation code to user
   * @param {string} email users email
   * @return {Promise} promise
   */
  async resetPassword(email: string) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });

      this.cognitoIdentity.adminGetUser(
        {
          UserPoolId: process.env.USER_POOL_ID || '',
          Username: email || '',
        },
        (error) => {
          if (error) reject(error); // an error occurred
        },
      );

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
   * Method to complete password reset request
   * @param {string} email users email
   * @param {string} confirmationCode password reset confirmation code received via email
   * @param {string} newPassword new password provided by user
   * @return promise
   */
  async confirmPassword(
    email: string,
    confirmationCode: string,
    newPassword: string,
  ) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
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
