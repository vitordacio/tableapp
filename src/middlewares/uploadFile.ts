import util from 'util';
import multer from 'multer';
import { multerConfig } from '@config/multer';

const uploadFile = multer(multerConfig).any();
export const uploadFileMiddleware = util.promisify(uploadFile);
