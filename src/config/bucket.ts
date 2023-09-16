import aws from 'aws-sdk';
import multer from 'multer';

const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT_S3 as string);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY as string,
  },
});

export const multerFile = multer({}).single('file');

export const listFiles = async () => {
  const files = await s3
    .listObjects({ Bucket: process.env.AWS_BUCKET as string })
    .promise();
  return files.Contents;
};

export const uploadFile = async (
  path: string,
  buffer: string,
  mimetype: string,
) => {
  const file = await s3
    .upload({
      Bucket: process.env.AWS_BUCKET as string,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return file.Location;
};

export const deleteFile = async (path: string) => {
  await s3
    .deleteObject({
      Bucket: process.env.AWS_BUCKET as string,
      Key: path,
    })
    .promise();
};
