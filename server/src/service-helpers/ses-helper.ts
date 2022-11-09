/* eslint-disable unicorn/text-encoding-identifier-case */
/* eslint-disable @typescript-eslint/naming-convention */
import process from 'node:process';
import SES from 'aws-sdk/clients/ses';

// Import mysql library

import * as dotenv from 'dotenv';

dotenv.config();

class SesHelper {
	public ses: SES;

	constructor() {
		this.ses = new SES({
			region: process.env.REGION,
			accessKeyId: process.env.AWS_SES_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
		});
	}

	/**
	 *
	 * @param fromemail sender email address
	 * @param text email message or body
	 * @param subject subject of email
	 * @returns promise
	 */
	async sendEmail(fromemail: string, text: string, subject: string) {
		// Use sendEmail method to send email according to parameters
		return this.ses
			.sendEmail({
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
			})
			.promise();
	}
}

export default SesHelper;
