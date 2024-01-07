import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import {
  verifyParamEventId,
  verifyParamMomentId,
} from '../middlewares/verifyParamId';
import { createMomentController } from '../main/Moment/createMoment';
import { deleteMomentController } from '../main/Moment/deleteMoment';
import { findMomentsByEventController } from '../main/Moment/findMomentsByEvent';
import { createMomentMiddleware } from '../middlewares/validators/Moment/createMoment';
import { updateMomentController } from '../main/Moment/updateMoment';
import { updateMomentMiddleware } from '../middlewares/validators/Moment/updateMoment';
import { verifyPageLimit } from '../middlewares/verifyPageLimit';

const momentRouter = Router();

momentRouter.get(
  '/moment/:event_id',
  [verifyToken, verifyParamEventId, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findMomentsByEventController.handle(req, res);
  },
);

momentRouter.post(
  '/moment',
  [verifyToken, createMomentMiddleware],
  async (req: Request, res: Response) => {
    return createMomentController.handle(req, res);
  },
);

momentRouter.put(
  '/moment',
  [verifyToken, updateMomentMiddleware],
  async (req: Request, res: Response) => {
    return updateMomentController.handle(req, res);
  },
);

momentRouter.delete(
  '/moment/:moment_id',
  [verifyToken, verifyParamMomentId],
  async (req: Request, res: Response) => {
    return deleteMomentController.handle(req, res);
  },
);

export { momentRouter };
