import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';

import { createRequestController } from '../main/Participation/createRequest';
import { createRequestMiddleware } from '../middlewares/validators/Participation/createRequest';
import { findParticipationByIdController } from '../main/Participation/findParticipationById';
import { deleteParticipationController } from '../main/Participation/deleteParticipation';
import { findParticipationByUserController } from '../main/Participation/findParticipationByUser';
import { findParticipationByEventIdController } from '../main/Participation/findParticipationByEventId';

import { createInviteController } from '../main/Participation/createInvite';
import { createResponseByEventController } from '../main/Participation/createResponseByEvent';
import { createInviteMiddleware } from '../middlewares/validators/Participation/createInvite';
import { createResponseByEventMiddleware } from '../middlewares/validators/Participation/createResponseByEvent';
import { createResponseInviteMiddleware } from '../middlewares/validators/Participation/createResponseInvite';
import { createResponseInviteController } from '../main/Participation/createResponseInvite';

const participationRouter = Router();

participationRouter.post(
  '/participation/request',
  [verifyToken, createRequestMiddleware],
  async (req: Request, res: Response) => {
    return createRequestController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/response',
  [verifyToken, createResponseByEventMiddleware],
  async (req: Request, res: Response) => {
    return createResponseByEventController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/request/invite',
  [verifyToken, createInviteMiddleware],
  async (req: Request, res: Response) => {
    return createInviteController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/response/invite',
  [verifyToken, createResponseInviteMiddleware],
  async (req: Request, res: Response) => {
    return createResponseInviteController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findParticipationByIdController.handle(req, res);
  },
);

participationRouter.get(
  '/participation',
  verifyToken,
  async (req: Request, res: Response) => {
    return findParticipationByUserController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/event/:event_id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findParticipationByEventIdController.handle(req, res);
  },
);

participationRouter.delete(
  '/participation/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteParticipationController.handle(req, res);
  },
);

export { participationRouter };
