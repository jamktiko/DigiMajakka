/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable operator-linebreak */

/**
 * Validates email address
 * @param email email to validate
 * @param schoolemailend schools unique email ending to check that user really is student from the school
 * @returns boolean if email was valid or not
 */
export const validateEmail = (email: string, schoolemailend: string) => {
	// Email regular expression taken from website: https://emailregex.com/
	const expression =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;

	// Slice emails end to check if it matches with given school email end
	const emailend = email.slice(email.indexOf('@'));

	// Check that both validation criteria passes
	const validation = Boolean(
		expression.test(email) && emailend === schoolemailend
	);

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
	// Phonenumber regular expressions taken from website: https://www.w3resource.com/javascript/form/phone-no-validation.php

	// Can be two differen formats
	const expression1 = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
	const expression2 = /^\+?(\d{2})\)?[-. ]?(\d{4})[-. ]?(\d{4})$/;

	const validate1 = expression1.test(phoneNumber);
	const validate2 = expression2.test(phoneNumber);

	// If either format passes then return true
	if (validate1 || validate2) {
		return true;
	}

	return false;
};
