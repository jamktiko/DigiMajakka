/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
/* eslint-disable operator-linebreak */
import {validateEmail, validatePhoneNumber} from '../validation';

const profileFactor = ({
	userprofileid = '',
	firstname = '',
	familyname = '',
	phonenumber = '',
	description = '',
	lookingfor = '',
	studyfield = '',
	yearofstudy = -1,
	publicity = false,
	email = '',
	schoolid = -1,
	cityid = -1,
	picturelink = '',
} = {}) => {
	const profile = {
		userprofileid,
		firstname,
		familyname,
		phonenumber,
		description,
		lookingfor,
		studyfield,
		yearofstudy,
		publicity,
		email,
		schoolid,
		cityid,
		picturelink,
	};
	return profile;
};

const profileTypeChecker = (profile: Record<string, unknown>) => {
	if (
		typeof profile.userprofileid !== 'number' ||
		typeof profile.firstname !== 'string' ||
		typeof profile.familyname !== 'string' ||
		typeof profile.phonenumber !== 'string' ||
		typeof profile.description !== 'string' ||
		typeof profile.lookingfor !== 'string' ||
		typeof profile.studyfield !== 'string' ||
		typeof profile.yearofstudy !== 'number' ||
		typeof profile.publicity !== 'boolean' ||
		typeof profile.email !== 'string' ||
		typeof profile.schoolid !== 'number' ||
		typeof profile.cityid !== 'number' ||
		typeof profile.picturelink !== 'string'
	) {
		console.log(
			'Object which tells if some value is not right type (shows true)'
		);

		console.log({
			userprofileid: typeof profile.userprofileid !== 'number',
			firstname: typeof profile.firstname !== 'string',
			familyname: typeof profile.familyname !== 'string',
			phonenumber: typeof profile.phonenumber !== 'string',
			description: typeof profile.description !== 'string',
			lookingfor: typeof profile.lookingfor !== 'string',
			studyfield: typeof profile.studyfield !== 'string',
			yearofstudy: typeof profile.yearofstudy !== 'number',
			publicity: typeof profile.publicity !== 'boolean',
			email: typeof profile.email !== 'string',
			schoolid: typeof profile.schoolid !== 'number',
			cityid: typeof profile.cityid !== 'number',
			picturelink: typeof profile.picturelink !== 'string',
		});

		return false;
	}

	return true;
};

export const profileValidator = (profile: Record<string, unknown>) => {
	const filteredProfile = profileFactor(profile);

	const validatedProfile = profileTypeChecker(filteredProfile);

	const emailValid = validateEmail(filteredProfile.email);

	const phoneValid = validatePhoneNumber(filteredProfile.phonenumber);

	if (!validatedProfile || !emailValid || !phoneValid) {
		return {
			profile: filteredProfile,
			valid: false,
			emailValid,
			phoneValid,
			validatedProfile,
		};
	}

	return {
		profile: filteredProfile,
		valid: true,
	};
};

export type Profile = {
	userprofileid: number;
	firstname: string;
	familyname: string;
	phonenumber: string;
	description: string;
	lookingfor: string;
	studyfield: string;
	publicity: boolean | number;
	email: string;
	schoolid: number;
	cityid: number;
	picturelink: string;
};

export const isProfile = (object: unknown) =>
	typeof object === 'object' &&
	object !== null &&
	'userprofileid' in object &&
	'firstname' in object &&
	'familyname' in object &&
	'phonenumber' in object &&
	'description' in object &&
	'lookingfor' in object &&
	'studyfield' in object &&
	'publicity' in object &&
	'email' in object &&
	'schoolid' in object &&
	'cityid' in object &&
	'picturelink' in object;
