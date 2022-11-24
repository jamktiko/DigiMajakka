import type express from 'express';
import queryDb from '../db-connection';

const cityC = {
  // Function to find city by name
  async findByName(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb('SELECT * FROM City WHERE name = ?;', [
        _request.params.name,
      ]);
      console.log(data);
      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },
  // Function to find all cities
  async findAll(
    _request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await queryDb('SELECT * FROM Cit;', []);

      console.log(data);

      response.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default cityC;
