import express from 'express';

// eslint-disable-next-line new-cap
const indexRouter = express.Router();

indexRouter.get('/', (_request, response) => {
	response.send('Hello World!');
});

export = indexRouter;
