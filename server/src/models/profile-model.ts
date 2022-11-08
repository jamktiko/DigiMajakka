// Import {validateEmail, validatePhoneNumber} from '../validation';

export type Profile = {
	firstname: string;
	familyname: string;
	phonenumber: string;
	description: string;
	lookingfor: string;
	studyfield: string;
	yearofstudy: number;
	publicity: boolean | number;
	accountemail: string;
	schoolname: string;
	cityname: string;
	picturelink: string;
	email: string;
} & Record<string, unknown>;

// Const profileFactor = ({
// 	userprofileid = -1,
// 	firstname = 'Etunimi',
// 	familyname = 'Sukunimi',
// 	phonenumber = 'Puhelinnumero',
// 	description = 'Kuvaus',
// 	lookingfor = 'Mitä etsit',
// 	studyfield = 'Koulutusala',
// 	yearofstudy = 0,
// 	publicity = false,
// 	accountemail = '',
// 	schoolname = '',
// 	cityname = '',
// 	picturelink = '',
// 	email = '',
// } = {}) => {
// 	const profile = {
// 		userprofileid,
// 		firstname,
// 		familyname,
// 		phonenumber,
// 		description,
// 		lookingfor,
// 		studyfield,
// 		yearofstudy,
// 		publicity,
// 		accountemail,
// 		schoolname,
// 		cityname,
// 		picturelink,
// 		email,
// 	};
// 	return profile;
// };

// const profileTypeChecker = (profile: Profile) => {
// 	if (
// 		typeof profile.userprofileid !== 'number' ||
// 		typeof profile.firstname !== 'string' ||
// 		typeof profile.familyname !== 'string' ||
// 		typeof profile.phonenumber !== 'string' ||
// 		typeof profile.description !== 'string' ||
// 		typeof profile.lookingfor !== 'string' ||
// 		typeof profile.studyfield !== 'string' ||
// 		typeof profile.yearofstudy !== 'number' ||
// 		typeof profile.publicity !== 'boolean' ||
// 		typeof profile.email !== 'string' ||
// 		typeof profile.schoolname !== 'number' ||
// 		typeof profile.cityname !== 'number' ||
// 		typeof profile.picturelink !== 'string' ||
// 		typeof profile.email !== 'string'
// 	) {
// 		console.log(
// 			'Object which tells if some value is not right type (shows true)'
// 		);

// 		console.log({
// 			userprofileid: typeof profile.userprofileid !== 'number',
// 			firstname: typeof profile.firstname !== 'string',
// 			familyname: typeof profile.familyname !== 'string',
// 			phonenumber: typeof profile.phonenumber !== 'string',
// 			description: typeof profile.description !== 'string',
// 			lookingfor: typeof profile.lookingfor !== 'string',
// 			studyfield: typeof profile.studyfield !== 'string',
// 			yearofstudy: typeof profile.yearofstudy !== 'number',
// 			publicity: typeof profile.publicity !== 'boolean',
// 			email: typeof profile.email !== 'string',
// 			schoolname: typeof profile.schoolname !== 'number',
// 			cityname: typeof profile.cityname !== 'number',
// 			picturelink: typeof profile.picturelink !== 'string',
// 		});

// 		return false;
// 	}

// 	return true;
// };

// export const profileValidator = (
// 	profile: Record<string, unknown>,
// 	schoolemailend: string
// ) => {
// 	const filteredProfile = profileFactor(profile);

// 	const validatedProfile = profileTypeChecker(filteredProfile);

// 	const emailValid = validateEmail(filteredProfile.email, schoolemailend);

// 	const phoneValid = validatePhoneNumber(filteredProfile.phonenumber);

// 	if (!validatedProfile || !emailValid || !phoneValid) {
// 		return {
// 			profile: filteredProfile,
// 			valid: false,
// 			emailValid,
// 			phoneValid,
// 			validatedProfile,
// 		};
// 	}

// 	return {
// 		profile: filteredProfile,
// 		valid: true,
// 	};
// };

// export const isProfile = (object: unknown) =>
// 	typeof object === 'object' &&
// 	object !== null &&
// 	'userprofileid' in object &&
// 	'firstname' in object &&
// 	'familyname' in object &&
// 	'phonenumber' in object &&
// 	'description' in object &&
// 	'lookingfor' in object &&
// 	'studyfield' in object &&
// 	'publicity' in object &&
// 	'email' in object &&
// 	'schoolname' in object &&
// 	'cityname' in object &&
// 	'picturelink' in object;
