import multer from 'multer';
import { multerConfig } from '@config/multer';
import util from 'util';

const uploadFile = multer(multerConfig).any();
export const uploadFileMiddleware = util.promisify(uploadFile);
