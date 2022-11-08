/* eslint-disable unicorn/text-encoding-identifier-case */
/* eslint-disable @typescript-eslint/naming-convention */
import process from 'node:process';
import SES from 'aws-sdk/clients/ses';

// Import mysql library

import * as dotenv from 'dotenv';

dotenv.config();

const Ses = new SES({
	region: process.env.REGION,
	accessKeyId: process.env.AWS_SES_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
});

const sendEmail = async (fromemail: string, text: string, subject: string) => {
	const parameters = {
		Destination: {
			ToAddresses: [fromemail],
		},
		Message: {
			Body: {
				Text: {
					Charset: 'UTF-8',
					Data: text,
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: subject,
			},
		},
		Source: fromemail,
	};
	return Ses.sendEmail(parameters).promise();
};

export default sendEmail;
