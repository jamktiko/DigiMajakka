/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */

import process from 'node:process';
import fs from 'node:fs';
import S3 from 'aws-sdk/clients/s3';

// Create new instance of s3
const s3 = new S3({
	region: process.env.REGION,
	accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
	secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
});

const imageHelper = {
	/**
	 * Function that uploads image ot s3 bucket
	 * @param file file that multer has saved
	 * @returns object which contains information of saved image
	 */
	async uploadImg(file: Express.Multer.File) {
		// Create filestream to read saved file
		const fileStream = fs.createReadStream(file.path);
		// Use upload method to upload filer to s3
		const result = await s3
			.upload({
				Bucket: process.env.AWS_BUCKET ?? '',
				Body: fileStream,
				Key: file.filename ?? '',
			})
			.promise();

		fs.unlink(process.cwd() + '/src/images/' + file.filename, (error) => {
			if (error) {
				console.error(error);
				throw new Error('Error when deleting image');
			}
		});

		return result;
	},
	async getImg(key: string) {
		return s3
			.getObject({
				Key: key,
				Bucket: process.env.AWS_BUCKET ?? '',
			})
			.createReadStream();
	},
};

export default imageHelper;
