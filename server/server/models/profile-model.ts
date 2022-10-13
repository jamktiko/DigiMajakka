/* eslint-disable operator-linebreak */
import {validateEmail, validatePhoneNumber} from '../validation.js';

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
		typeof profile.idprofile !== 'string' ||
		typeof profile.firstname !== 'string' ||
		typeof profile.surname !== 'string' ||
		typeof profile.phone !== 'string' ||
		typeof profile.description !== 'string' ||
		typeof profile.whatlookingfor !== 'string' ||
		typeof profile.fieldOfstudy !== 'string' ||
		typeof profile.studyYear !== 'number' ||
		typeof profile.publicity !== 'boolean' ||
		typeof profile.email !== 'string' ||
		typeof profile.idschool !== 'number' ||
		typeof profile.idcity !== 'number' ||
		typeof profile.picture !== 'string'
	) {
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
		};
	}

	return {
		profile: filteredProfile,
		valid: true,
	};
};

export default profileValidator;
