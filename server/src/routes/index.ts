/* eslint-disable new-cap */
import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (_request, response) => {
  response.status(200).send('DigiMajakka backend');
});

export default indexRouter;
