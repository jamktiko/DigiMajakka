import express from 'express';
import test from '../controllers/index-controller.js';
// eslint-disable-next-line new-cap
const indexRouter = express.Router();

indexRouter.get('/', (_request, response) => {
	test((error, result) => {
		if (error) {
			console.error(error);
			throw new Error('Error when queyring database');
		} else {
			response.send(result);
		}
	});
});

export = indexRouter;
