import queryDb from '../db-connection';

/**
 * Validates school email by users email end after @
 * @param {string} email
 * @return {object} object that contains boolean if validation was success, users email end and message
 */
const validateSchoolEmail = async (email: string) => {
  try {
    // Separate email end after @ from email string
    const userEmailEnd = email.slice(email.indexOf('@'));

    // Find if school with that email end exists
    const schooldata = await queryDb(
      'SELECT * FROM School WHERE emailend = ?;',
      [userEmailEnd],
    );
    // If school does not exists throw error
    if (!schooldata.length) {
      return {
        valid: false,
        userEmailEnd,
        message: 'School with given email does not exists',
      };
    }
    return {
      valid: true,
      userEmailEnd,
      message: 'Email valid',
    };
  } catch (error: unknown) {
    return {
      valid: false,
      message: 'Error when validating school email',
    };
  }
};

export default validateSchoolEmail;
