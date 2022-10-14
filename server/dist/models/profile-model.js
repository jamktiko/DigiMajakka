"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable operator-linebreak */
const validation_1 = require("../validation");
const profileFactor = ({ idprofile = '', firstname = '', surname = '', phone = '', description = '', whatlookingfor = '', fieldOfStudy = '', studyYear = -1, publicity = false, email = '', idschool = -1, idcity = -1, picture = '', } = {}) => {
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
const profileTypeChecker = (profile) => {
    if (typeof profile.idprofile !== 'string' ||
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
        typeof profile.picture !== 'string') {
        return false;
    }
    return true;
};
const profileValidator = (profile) => {
    const filteredProfile = profileFactor(profile);
    const validatedProfile = profileTypeChecker(filteredProfile);
    const emailValid = (0, validation_1.validateEmail)(filteredProfile.email);
    const phoneValid = (0, validation_1.validatePhoneNumber)(filteredProfile.phone);
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
exports.default = profileValidator;
