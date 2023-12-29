import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import {
  createReportUserMiddleware,
  createReportEventMiddleware,
} from '../middlewares/validators/Report/createReport';
import { verifyParamReportId } from '../middlewares/verifyParamId';
import { deleteReportController } from '../main/Report/deleteReport';
import { findReportController } from '../main/Report/findReport';
import { createReportEventController } from '../main/Report/createReportEvent';
import { createReportUserController } from '../main/Report/createReportUser';

const reportRouter = Router();

reportRouter.get(
  '/report/:report_id',
  [verifyToken, verifyParamReportId],
  async (req: Request, res: Response) => {
    return findReportController.handle(req, res);
  },
);

reportRouter.post(
  '/report/user',
  [verifyToken, createReportUserMiddleware],
  async (req: Request, res: Response) => {
    return createReportUserController.handle(req, res);
  },
);

reportRouter.post(
  '/report/event',
  [verifyToken, createReportEventMiddleware],
  async (req: Request, res: Response) => {
    return createReportEventController.handle(req, res);
  },
);

reportRouter.delete(
  '/report/:report_id',
  [verifyToken, verifyParamReportId],
  async (req: Request, res: Response) => {
    return deleteReportController.handle(req, res);
  },
);

export { reportRouter };
