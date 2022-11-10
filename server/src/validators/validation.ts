/* eslint-disable operator-linebreak */

/**
 * Validates email address
 * @param email email to validate
 * @param schoolemailend schools unique email ending to check that user really is student from the school
 * @returns boolean if email was valid or not
 */
export const validateEmail = (email: string) => {
	// Email regular expression taken from website: https://emailregex.com/
	const expression =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;

	// Check that both validation criteria passes
	const validation = expression.test(email);

	if (validation) {
		return true;
	}

	return false;
};

/**
 * Validates phonenumber
 * @param phoneNumber phonenumber to validate
 * @returns boolean if phonenumber was valid or not
 */
export const validatePhoneNumber = (phoneNumber: string) => {
	// Phonenumber regular expressions taken from website: https://regex101.com/library/ffGtsW

	// Can be two differen formats
	const expression =
		/^((04\d)(\s?|-?)|050(\s?|-?)|0457(\s?|-?)|\+?358(\s?|-?)50|0358(\s?|-?)50|00358(\s?|-?)50|\+?358(\s?|-?)4\d|0358(\s?|-?)4\d|00358(\s?|-?)4\d)(\s?|-?)((\d{3,4})(\s|-)?\d{1,4})$/;

	const validate = expression.test(phoneNumber);

	// If either format passes then return true
	if (validate) {
		return true;
	}

	return false;
};

export const validateEmailEnd = (email: string, schoolemailend: string) => {
	// Slice emails end to check if it matches with given school email end
	const emailend = email.slice(email.indexOf('@'));

	if (emailend === schoolemailend) {
		return true;
	}

	return false;
};
