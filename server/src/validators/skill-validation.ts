/* eslint-disable @typescript-eslint/comma-dangle */

/**
 *
 * @param param0 factor which filters unallowed fields from object and checks that there are all necessary fields in it
 * @returns filtered object which only have fields that are allowed in database
 */
const skillFactor = ({skillid = -1, name = ''} = {}) => {
  const skills = {
    skillid,
    name,
  };
  return skills;
};

/**
 *
 * @param skills Object which contains skills
 * @returns Boolean if object has valid types or not
 */
const skillTypeChecker = (skills: Record<string, unknown>) => {
  if (typeof skills.skillid !== 'number' || typeof skills.name !== 'string') {
    console.log(
      'Object which tells if some value is not right type (shows true)',
    );
    console.log({
      skillid: typeof skills.skillid !== 'number',
      name: typeof skills.name !== 'string',
    });
    return false;
  }

  return true;
};

/**
 *
 * @param skills object that will be validated
 * @returns validated object and boolean if validation was success
 */
const skillValidator = (skills: Record<string, unknown>) => {
  const filteredSkills = skillFactor(skills);

  const validatedSkills = skillTypeChecker(filteredSkills);

  if (!validatedSkills) {
    return {
      skills: filteredSkills,
      valid: false,
    };
  }

  return {
    skills: filteredSkills,
    valid: true,
  };
};

export default skillValidator;
