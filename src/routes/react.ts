import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import {
  verifyParamEventId,
  verifyParamReactId,
  verifyParamUserId,
} from '../middlewares/verifyParamId';
import { createReactMiddleware } from '../middlewares/validators/React/createReact';
import { deleteReactController } from '../main/React/deleteReact';
import { findReactByIdController } from '../main/React/findReactById';
import { createReactUserController } from '../main/React/createReactUser';
import { createReactEventController } from '../main/React/createReactEvent';

const reactRouter = Router();

reactRouter.post(
  '/react/user/:user_id',
  [verifyToken, createReactMiddleware, verifyParamUserId],
  async (req: Request, res: Response) => {
    return createReactUserController.handle(req, res);
  },
);

reactRouter.post(
  '/react/event/:event_id',
  [verifyToken, createReactMiddleware, verifyParamEventId],
  async (req: Request, res: Response) => {
    return createReactEventController.handle(req, res);
  },
);

reactRouter.get(
  '/react/:react_id',
  [verifyToken, verifyParamReactId],
  async (req: Request, res: Response) => {
    return findReactByIdController.handle(req, res);
  },
);

reactRouter.delete(
  '/react/:react_id',
  [verifyToken, verifyParamReactId],
  async (req: Request, res: Response) => {
    return deleteReactController.handle(req, res);
  },
);

export { reactRouter };
