import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { verifyParamUserId } from '../middlewares/verifyParamId';
import { createBlockController } from '../main/Block/createBlock';
import { deleteBlockController } from '../main/Block/deleteBlock';
import { findBlockController } from '../main/Block/findBlock';

const blockRouter = Router();

blockRouter.get(
  '/block/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return findBlockController.handle(req, res);
  },
);

blockRouter.post(
  '/block/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return createBlockController.handle(req, res);
  },
);

blockRouter.delete(
  '/block/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return deleteBlockController.handle(req, res);
  },
);

export { blockRouter };
