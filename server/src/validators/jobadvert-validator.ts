import type Jobadvert from '../models/jobadvert-model';
import {validateEmail} from './validation';

const jobadvertFactor = ({
  advertid = '',
  firstname = '',
  familyname = '',
  company = null,
  startdate = null,
  email = 'esimerkki@sahkoposti.com',
  phonenumber = '000-0000-0000',
  jobtitle = '',
  description = '',
  salary = '',
  validuntil = '0000-00-00',
  isvalid = true,
  accepted = false,
  city = '',
}: Jobadvert): Jobadvert => ({
  advertid,
  firstname,
  familyname,
  company,
  startdate,
  email,
  phonenumber,
  jobtitle,
  description,
  salary,
  validuntil,
  isvalid,
  accepted,
  city,
});

const jobadvertTypeChecker = (jobadvert: Jobadvert) => {
  if (
    typeof jobadvert.advertid !== 'string' ||
    typeof jobadvert.firstname !== 'string' ||
    typeof jobadvert.familyname !== 'string' ||
    Boolean(
      typeof jobadvert.company !== 'string' && jobadvert.company !== null,
    ) ||
    Boolean(
      typeof jobadvert.startdate !== 'string' && jobadvert.startdate !== null,
    ) ||
    typeof jobadvert.email !== 'string' ||
    typeof jobadvert.phonenumber !== 'string' ||
    typeof jobadvert.jobtitle !== 'string' ||
    typeof jobadvert.description !== 'string' ||
    typeof jobadvert.salary !== 'string' ||
    typeof jobadvert.validuntil !== 'string' ||
    typeof jobadvert.isvalid !== 'boolean' ||
    typeof jobadvert.accepted !== 'boolean' ||
    typeof jobadvert.city !== 'string'
  ) {
    console.log({
      advertid: typeof jobadvert.advertid === 'string',
      firstname: typeof jobadvert.firstname === 'string',
      familyname: typeof jobadvert.familyname === 'string',
      company: Boolean(
        typeof jobadvert.company === 'string' || jobadvert.company === null,
      ),
      startdate: Boolean(
        typeof jobadvert.startdate === 'string' || jobadvert.startdate === null,
      ),
      email: typeof jobadvert.email === 'string',
      phonenumber: typeof jobadvert.phonenumber === 'string',
      jobtitle: typeof jobadvert.jobtitle === 'string',
      description: typeof jobadvert.description === 'string',
      salary: typeof jobadvert.salary === 'string',
      validuntil: typeof jobadvert.validuntil === 'string',
      isvalid: typeof jobadvert.isvalid === 'boolean',
      accepted: typeof jobadvert.accepted === 'boolean',
      city: typeof jobadvert.city === 'string',
    });

    return false;
  }

  return true;
};

const jobadvertValidation = (jobadvert: Jobadvert) => {
  const emailValid = validateEmail(jobadvert.email);

  const filteredAdvert: Jobadvert = jobadvertFactor(jobadvert);

  const typeCheck = jobadvertTypeChecker(jobadvert);

  if (!emailValid || !filteredAdvert || !typeCheck) {
    return {
      valid: false,

      emailValid,
      filteredAdvert,
      typeCheck,
    };
  }

  return {
    jobadvert: filteredAdvert,
    valid: true,
  };
};

export default jobadvertValidation;
