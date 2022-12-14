/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */

import process from 'node:process';
import fs from 'node:fs';
import S3 from 'aws-sdk/clients/s3';
import dotenv from 'dotenv';
dotenv.config();

// Create new instance of s3
const s3 = new S3({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
});

const imageHelper = {
  /**
   * Function that uploads image ot s3 bucket
   * @param {Express.Multer.File} file file that multer has saved
   * @return {S3.ManagedUpload.SendData} object which contains information of saved image
   */
  async uploadImg(file: Express.Multer.File) {
    // Create filestream to read saved file
    const fileStream = fs.createReadStream(file.path);
    // Use upload method to upload filer to s3
    // code try catch structure here
    const result = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET ?? '',
        Body: fileStream,
        Key: file.filename ?? '',
      })
      .promise();
    // Delete image from servers local folder after upload
    fs.unlink(process.cwd() + '/src/images/' + file.filename, (error) => {
      if (error) {
        console.error(error);
        throw new Error('Error when deleting image');
      }
    });

    return result;
  },
  /**
   * Function that downloads image from s3 bucket
   * @param {string} key S3 objects key that stores image
   * @return {PromiseResult<S3.GetObjectOutput, AWSError>} image
   */
  async getImg(key: string) {
    try {
      // Define download parameters
      const downloadParams = {
        Key: key,
        Bucket: process.env.AWS_BUCKET || '',
      };

      // Check that object with specified key exists
      // Throws error if it does not
      await s3.headObject(downloadParams).promise();

      // Use getObject method to feth image and return it as promise
      const data = await s3.getObject(downloadParams).promise();

      if (typeof data.Body !== 'undefined') {
        return data.Body;
      } else {
        throw new Error('No image found');
      }
    } catch (error: unknown) {
      return null;
    }
  },
};

export default imageHelper;
