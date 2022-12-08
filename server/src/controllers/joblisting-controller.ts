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
  async findById(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb(
        'SELECT * FROM JobAdvert WHERE advertid = ?;',
        [_request.params.advertid],
      );
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
      console.log(_request.body);

      // Create unique id for advert
      const advertid: string = uniqid();

      // Create new date object
      const currentDate = new Date();

      // Create date object that is six months from current date
      const newDate = new Date(
        currentDate.setMonth(currentDate.getMonth() + 6),
      );
      // Check that date is in correct format (YYYY-MM-DD)
      if (!_request.body.validuntil.match(/^\d{4}-\d{2}-\d{2}$/)) {
        throw new Error('Date is not in valid format. Should be YYYY-MM-DD.');
      }

      const userDate = new Date(_request.body.validuntil);
      // Check that adverts expiration date is less than half year from now
      const validuntil =
        userDate > newDate
          ? `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDay()}`
          : _request.body.validuntil;
      // Validate profile
      const valid = jobadvertValidation({
        advertid,
        ..._request.body,

        accepted: false,

        isvalid: true,
        validuntil,
      });

      // If profile is not valid throw error
      if (valid.valid && valid.jobadvert) {
        const insert = queryDb(
          'INSERT INTO JobAdvert VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          Object.values(valid.jobadvert),
        );
        const emailtext = 'Kiitos ilmoituksestasi. ';
        const htmlText = `<head>
        </head>
        <body>
            <h2>Ilmoituksen tunniste: ${advertid}<h2>
            <h2>${_request.body.jobtitle}</h2>
            <p>Etunimi: ${_request.body.firstname}</p>
            <p>Sukunimi: ${_request.body.familyname}</p>
            <p>Yritys: ${
              _request.body.company === null ? '' : _request.body.company
            }</p>
            <p> Alkamispäivä: ${
              _request.body.startdate === null ? '' : _request.body.startdate
            }</p>
            <p>Sähköposti: ${_request.body.email}</p>
            <p>Puhelinnumero: ${_request.body.phonenumber}</p>
            <p>Kuvaus: ${_request.body.description}</p>
            <p>Palkka: ${_request.body.salary}</p>
            <p>Paikkakunta: ${_request.body.city}</p>
            <p>Ilmoitus voimassa: ${validuntil}</p>
            <h3>Poista ilmoitus painamalla alla olevaa linkkiä</h3>
            <a href="http://localhost:4200/jobadvert/delete/${advertid}">Poista ilmoitus</a>
        </body>`;
        // Send email to job adverts creator with link to update advert
        await ses.sendEmail(
          'digimajakka.asiakaspalvelu@gmail.com',
          emailtext,
          'Kiitos luomastasi ilmoituksesta',
          htmlText,
        );

        console.log(insert);

        response.status(201).json({
          message: 'Created advert successfully',
          success: true,
          advert: {
            advertid,
            ..._request.body,
            validuntil,
          },
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
      const emailtext = 'Ilmoituksesi on poistettu palvelusta digimajakka';
      const htmltext =
        '<h3>Ilmoituksesi on poistettu palvelusta digimajakka</h3>';
      await ses.sendEmail(
        'digimajakka.asiakaspalvelu@gmail.com',
        emailtext,
        'Ilmoituksen poisto',
        htmltext,
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
  // Function to update job advert
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
