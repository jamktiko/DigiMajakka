import {response} from 'express';

const errorHandler = (error: unknown) => {
	console.error(error);
	response.status(200).json({
		message: error,
		success: false,
	});
};

export default errorHandler;
