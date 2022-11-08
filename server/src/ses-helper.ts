/* eslint-disable unicorn/text-encoding-identifier-case */
/* eslint-disable @typescript-eslint/naming-convention */
import process from 'node:process';
import SES from 'aws-sdk/clients/ses';

// Import mysql library

import * as dotenv from 'dotenv';

dotenv.config();

// Create new instance of simple email service
const Ses = new SES({
	region: process.env.REGION,
	accessKeyId: process.env.AWS_SES_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
});

/**
 *
 * @param fromemail sender email address
 * @param text email message or body
 * @param subject subject of email
 * @returns promise
 */
const sendEmail = async (fromemail: string, text: string, subject: string) => {
	// Define email parameters
	const parameters = {
		// Receiver email address or addresses
		Destination: {
			ToAddresses: [fromemail],
		},
		Message: {
			// Emails body or text/message
			Body: {
				Text: {
					Charset: 'UTF-8',
					Data: text,
				},
			},
			// Email subject
			Subject: {
				Charset: 'UTF-8',
				Data: subject,
			},
		},
		// Sender address
		Source: fromemail,
	};
	// Use sendEmail method to send email according to parameters
	return Ses.sendEmail(parameters).promise();
};

export default sendEmail;
