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
  // Return all job adverts from database
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
  // Function to find job advert by id
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
      // Create unique id for advert
      const advertid: string = uniqid();

      // Create new date object
      const date = new Date();

      // Set date 6 months forward
      date.setMonth(date.getMonth() + 6);

      // Check that date is in correct format (YYYY-MM-DD)
      if (!_request.body.validuntil.match(/^\d{4}-\d{2}-\d{2}$/)) {
        throw new Error('Date is not in valid format. Should be YYYY-MM-DD.');
      }

      const userDate = new Date(_request.body.validuntil);
      // Check that adverts expiration date is less than half year from now
      const validuntil =
        userDate > date
          ? `${date.getFullYear()}-${
              // If month is below 10 it is needed to place 0 before month number so it is in valid format
              // Also getMonth start counting months from 0 (january) so it is needed to + 1 to get correct date
              date.getMonth() + 1 > 9
                ? date.getMonth() + 1
                : '0' + (date.getMonth() + 1)
            }-${
              // If day is below 10 it is needed 0 before day number so it is in valid format
              date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
            }`
          : _request.body.validuntil;

      // Contruct profile object containing all necessary data
      const profileObj = {
        advertid,
        ..._request.body,
        accepted: false,
        isvalid: true,
        validuntil,
      };

      // Validate profile
      const valid = jobadvertValidation(profileObj);

      // If profile is not valid throw error
      if (valid.valid && valid.jobadvert) {
        const insert = queryDb(
          'INSERT INTO JobAdvert VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          Object.values(valid.jobadvert),
        );

        // Text if target email does not support html body
        const emailtext = 'Kiitos ilmoituksestasi. ';

        // Email text if target email supports html text
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
        // Currently sends email only to digimajakka email because aws SES access rights are limited
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
        // Create error object containing information which data received was incorrect
        const errorMsg = {
          message:
            'Some received fields not valid, shows false at invalid fields',
          phonenumber: valid.phonenumberValid,
          email: valid.emailValid,
          fieldtypes: valid.typeCheck,
          startdate: valid.startdateValid,
          expirationDate: valid.expirationDateValid,
        };
        throw new CustomError(JSON.stringify(errorMsg), 400);
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
      // Email text if target email does not support html text
      const emailtext = 'Ilmoituksesi on poistettu palvelusta digimajakka';

      // Email text if target email supports html text
      const htmltext =
        '<h3>Ilmoituksesi on poistettu palvelusta digimajakka</h3>';

      // Send email to given email adress
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
