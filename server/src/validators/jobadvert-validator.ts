/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
import type Jobadvert from '../models/jobadvert-model';
import {validatePhoneNumber, validateEmail} from '../validation';

const jobadvertFactor = ({
	advertid = '',
	firstname = '',
	familyname = '',
	company = '',
	startdate = '0000-00-00',
	enddate = '0000-00-00',
	email = 'esimerkki@sahkoposti.com',
	phonenumber = '000-0000-0000',
	jobtitle = '',
	description = '',
	salary = '',
	validuntil = '0000-00-00',
	isvalid = true,
	accepted = false,
	city = '',
} = {}) => ({
	advertid,
	firstname,
	familyname,
	company,
	startdate,
	enddate,
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
		typeof jobadvert.company !== 'string' ||
		typeof jobadvert.startdate !== 'string' ||
		typeof jobadvert.enddate !== 'string' ||
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
			advertid: typeof jobadvert.advertid !== 'string',
			firstname: typeof jobadvert.firstname !== 'string',
			familyname: typeof jobadvert.familyname !== 'string',
			company: typeof jobadvert.company !== 'string',
			startdate: typeof jobadvert.startdate !== 'string',
			enddate: typeof jobadvert.enddate !== 'string',
			email: typeof jobadvert.email !== 'string',
			phonenumber: typeof jobadvert.phonenumber !== 'string',
			jobtitle: typeof jobadvert.jobtitle !== 'string',
			description: typeof jobadvert.description !== 'string',
			salary: typeof jobadvert.salary !== 'string',
			validuntil: typeof jobadvert.validuntil !== 'string',
			isvalid: typeof jobadvert.isvalid !== 'boolean',
			accepted: typeof jobadvert.accepted !== 'boolean',
			city: typeof jobadvert.city !== 'string',
		});

		return false;
	}

	return true;
};

const jobadvertValidation = (jobadvert: Jobadvert) => {
	const valid = Boolean(
		validatePhoneNumber(jobadvert.phonenumber) &&
			validateEmail(jobadvert.email) &&
			jobadvertFactor(jobadvert) &&
			jobadvertTypeChecker(jobadvert)
	);
	return Boolean(valid);
};

export default jobadvertValidation;
