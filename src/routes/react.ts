import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import {
  verifyParamEventId,
  verifyParamReactId,
  verifyParamUserId,
} from '../middlewares/verifyParamId';
import {
  createReactUserMiddleware,
  createReactEventMiddleware,
} from '../middlewares/validators/React/createReact';
import { deleteReactController } from '../main/React/deleteReact';
import { findReactByIdController } from '../main/React/findReactById';
import { createReactUserController } from '../main/React/createReactUser';
import { createReactEventController } from '../main/React/createReactEvent';
import { findReactsByUserIdController } from '../main/React/findReactsByUserId';
import { findReactsReceivedByUserIdController } from '../main/React/findReactsReceivedByUserId';
import { findReceivedByUserIdMiddleware } from '../middlewares/validators/React/findReceivedByUserId';
import { findReactsByEventIdController } from '../main/React/findReactsByEventId';

const reactRouter = Router();

reactRouter.post(
  '/react/user',
  [verifyToken, createReactUserMiddleware],
  async (req: Request, res: Response) => {
    return createReactUserController.handle(req, res);
  },
);

reactRouter.post(
  '/react/event',
  [verifyToken, createReactEventMiddleware],
  async (req: Request, res: Response) => {
    return createReactEventController.handle(req, res);
  },
);

reactRouter.get(
  '/react/event/:event_id',
  [verifyToken, verifyParamEventId],
  async (req: Request, res: Response) => {
    return findReactsByEventIdController.handle(req, res);
  },
);

reactRouter.get(
  '/react/user/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return findReactsByUserIdController.handle(req, res);
  },
);

reactRouter.get(
  '/react/user/received/:user_id',
  [verifyToken, findReceivedByUserIdMiddleware, verifyParamUserId],
  async (req: Request, res: Response) => {
    return findReactsReceivedByUserIdController.handle(req, res);
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
