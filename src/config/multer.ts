/* eslint-disable @typescript-eslint/no-explicit-any */

import path from 'path';
import multer from 'multer';
import { v4 } from 'uuid';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { Request } from 'express';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'public', 'uploads'));
    },

    filename: (req, file, cb) => {
      const fileName = `${v4()}$${file.originalname
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '_')}`;

      return cb(null, fileName);
    },
  }),
  s3: multerS3({
    s3: new aws.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY as string,
      },
      region: process.env.AWS_DEFAULT_REGION,
    }),
    bucket: process.env.AWS_BUCKET || 'BUCKET_NAME',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const fileName = `${v4()}`;

      return cb(null, fileName);
    },
  }),
};

export const multerConfig = {
  dest: path.resolve(__dirname, '..', 'public', 'uploads'),
  storage: storageTypes.local,
  limits: {
    fileSize: 10 * 1024 * 1024,
    fieldSize: 10 * 1024 * 1024,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, isValid: any) => void,
  ): void => {
    const allowedMimes = [
      'audio/aac',
      'video/x-msvideo',
      'audio/mpeg',
      'video/mp4',
      'audio/x-aac',
      'audio/webm',
      'audio/x-aiff',
      'audio/m4a',
      'audio/caf',
      'application/json',
      'audio/ogg',
      'audio/x-wav',
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/jpg',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/vnd.ms-excel.sheet.macroEnabled.12',
      'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, true);
      // cb(new AppError('Tipo de arquivo inválido.', 400), null);
    }
  },
};
