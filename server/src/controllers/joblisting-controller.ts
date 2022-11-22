import type express from 'express';

import uniqid from 'uniqid';
import queryDb from '../db-connection';
import SesHelper from '../service-helpers/ses-helper';
import jobadvertValidation from '../validators/jobadvert-validator';
import CustomError from '../custom-error';
import convertBodyToQueryFormat from '../functions/convert-body-to-update-string';

// Create new instacne of ses helper
const ses = new SesHelper();

const joblistingC = {
  // Return all jobs from Tyoilmoitus board
  async findAll(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb('SELECT * FROM JobAdvert;', []);
      console.log(data);

      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },
  // Function to insert new advert into database
  async createAdvert(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      // Create unique id for advert
      const advertid: string = uniqid();

      const date = new Date();

      const newDate = new Date(date.setMonth(date.getMonth() + 6));

      // Validate profile
      const valid = jobadvertValidation({
        advertid,
        ..._request.body,
        accepted: false,
        isvalid: true,
        validuntil: `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDay()}`,
      });

      // If profile is not valid throw error
      if (valid.valid && valid.jobadvert) {
        const insert = queryDb(
          'INSERT INTO JobAdvert VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          Object.values(valid.jobadvert),
        );
        const emailtext =
          'Kiitos ilmoituksesta. Pääset muokkaamaan ilmoitustasi linkin kautta ' +
          'www.digimajakka.fi/muokkaa/' +
          advertid +
          'Voit poistaa ilmotuksesi linkistä ' +
          'www.digimajakka.fi/poista/' +
          advertid;
        // Send email to job adverts creator with link to update advert
        await ses.sendEmail(
          'digimajakka.asiakaspalvelu@gmail.com',
          emailtext,
          'testi',
        );

        console.log(insert);

        response.status(201).json({
          message: 'Created advert successfully',
          success: true,
        });
      } else {
        throw new CustomError(
          JSON.stringify({
            message:
              'Some advert fields not valid, shows false at invalid fields',
            phonenumber: valid.phonenumberValid,
            email: valid.emailValid,
            fieldtypes: valid.typeCheck,
          }),
          400,
        );
      }
    } catch (error: unknown) {
      next(error);
    }
  },
  // Function to delete advert from database
  async deleteAdvert(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const result = await queryDb(
        'DELETE FROM JobAdvert WHERE advertid = ?;',
        [_request.params.advertid],
      );

      console.log(result);

      response.status(200).json({
        success: true,
        message: 'Deleted job advert successfully',
      });
    } catch (error: unknown) {
      next(error);
    }
  },
  async updateAdvert(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const {sql, sqlparams} = convertBodyToQueryFormat(
        _request,
        'JobAdvert',
        'advertid',
      );

      const result = queryDb(sql, [...sqlparams, _request.params.advertid]);

      console.log(result);
      response.status(200).json({
        success: true,
        message: 'Updated advert successfully',
      });
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default joblistingC;
