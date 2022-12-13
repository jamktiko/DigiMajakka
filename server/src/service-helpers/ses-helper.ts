/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */

/* eslint-disable @typescript-eslint/naming-convention */
import process from 'node:process';
import SES from 'aws-sdk/clients/ses';
import dotenv from 'dotenv';
dotenv.config();

// Import mysql library

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
   * Sends email to user
   * @param {string} fromemail sender email address
   * @param {string}  text email message or body
   * @param {string} subject subject of email
   * @param {string} htmlText email body in html format
   * @return {Promise} promise
   */
  async sendEmail(
    fromemail: string,
    text: string,
    subject: string,
    htmlText: string,
  ) {
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
            Html: {Charset: 'UTF-8', Data: htmlText},
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
