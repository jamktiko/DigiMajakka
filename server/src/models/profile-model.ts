/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
/* eslint-disable operator-linebreak */
import {validateEmail, validatePhoneNumber} from '../validation';

const profileFactor = ({
	idprofile = '',
	firstname = '',
	surname = '',
	phone = '',
	description = '',
	whatlookingfor = '',
	fieldOfStudy = '',
	studyYear = -1,
	publicity = false,
	email = '',
	idschool = -1,
	idcity = -1,
	picture = '',
} = {}) => {
	const profile = {
		idprofile,
		firstname,
		surname,
		phone,
		description,
		whatlookingfor,
		fieldOfStudy,
		studyYear,
		publicity,
		email,
		idschool,
		idcity,
		picture,
	};
	return profile;
};

const profileTypeChecker = (profile: Record<string, unknown>) => {
	if (
		typeof profile.idprofile !== 'number' ||
		typeof profile.firstname !== 'string' ||
		typeof profile.surname !== 'string' ||
		typeof profile.phone !== 'string' ||
		typeof profile.description !== 'string' ||
		typeof profile.whatlookingfor !== 'string' ||
		typeof profile.fieldOfStudy !== 'string' ||
		typeof profile.studyYear !== 'number' ||
		typeof profile.publicity !== 'boolean' ||
		typeof profile.email !== 'string' ||
		typeof profile.idschool !== 'number' ||
		typeof profile.idcity !== 'number' ||
		typeof profile.picture !== 'string'
	) {
		console.log(
			'Object which tells if some value is not right type (shows true)'
		);

		console.log({
			profile: typeof profile.idprofile !== 'number',
			firstname: typeof profile.firstname !== 'string',
			surname: typeof profile.surname !== 'string',
			phone: typeof profile.phone !== 'string',
			description: typeof profile.description !== 'string',
			whatlookingfor: typeof profile.whatlookingfor !== 'string',
			fieldOfstudy: typeof profile.fieldOfStudy !== 'string',
			studyYear: typeof profile.studyYear !== 'number',
			publicity: typeof profile.publicity !== 'boolean',
			email: typeof profile.email !== 'string',
			idschool: typeof profile.idschool !== 'number',
			idcity: typeof profile.idcity !== 'number',
			picture: typeof profile.picture !== 'string',
		});

		return false;
	}

	return true;
};

const profileValidator = (profile: Record<string, unknown>) => {
	const filteredProfile = profileFactor(profile);

	const validatedProfile = profileTypeChecker(filteredProfile);

	const emailValid = validateEmail(filteredProfile.email);

	const phoneValid = validatePhoneNumber(filteredProfile.phone);

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

export default profileValidator;
