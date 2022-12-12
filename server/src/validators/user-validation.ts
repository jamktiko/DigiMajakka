/* eslint-disable operator-linebreak */
import type User from '../models/user-model';

export const userFactor = ({
  email = '',
  admin = false,
  schoolname = '',
} = {}) => ({
  email,
  admin,
  schoolname,
});

export const userTypeChecker = (user: User) => {
  if (
    typeof user.email !== 'string' ||
    typeof user.admin !== 'boolean' ||
    typeof user.schoolname !== 'number'
  ) {
    console.log({
      email: typeof user.email === 'string',
      admin: typeof user.admin === 'boolean',
      schoolid: typeof user.schoolname === 'string',
    });

    return false;
  }

  return true;
};
