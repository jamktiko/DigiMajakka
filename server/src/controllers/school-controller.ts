import type express from 'express';
import queryDb from '../db-connection';

const schoolC = {
  // Function for finding school by name
  async findByName(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb('SELECT * FROM School WHERE name = ?;', [
        _request.params.name,
      ]);

      console.log(data);

      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },
  // Function for finding all schools
  async findAll(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb('SELECT * FROM School;', []);

      console.log(data);

      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default schoolC;
