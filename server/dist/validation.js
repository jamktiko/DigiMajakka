"use strict";
/* eslint-disable operator-linebreak */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = exports.validateEmail = void 0;
const validateEmail = (email) => {
    // Email regular expression taken from website: https://emailregex.com/
    const expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
    const validation = expression.test(email);
    if (validation) {
        return true;
    }
    return false;
};
exports.validateEmail = validateEmail;
const validatePhoneNumber = (phoneNumber) => {
    // Phonenumber regular expressions taken from website: https://www.w3resource.com/javascript/form/phone-no-validation.php
    const expression1 = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
    const expression2 = /^\+?(\d{2})\)?[-. ]?(\d{4})[-. ]?(\d{4})$/;
    const validate1 = expression1.test(phoneNumber);
    const validate2 = expression2.test(phoneNumber);
    if (validate1 || validate2) {
        return true;
    }
    return false;
};
exports.validatePhoneNumber = validatePhoneNumber;
