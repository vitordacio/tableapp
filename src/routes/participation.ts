import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';

import { createParticipationByUserController } from '../main/Participation/createParticipationByUser';
import { createParticipationByUserMiddleware } from '../middlewares/validators/Participation/createParticipationByUser';
import { findParticipationByIdController } from '../main/Participation/findParticipationById';
import { deleteParticipationController } from '../main/Participation/deleteParticipation';
import { findParticipationsByUserController } from '../main/Participation/findParticipationsByUser';
import { findParticipationByEventIdController } from '../main/Participation/findParticipationByEventId';

import { createParticipationByEventMiddleware } from '../middlewares/validators/Participation/createParticipationByEvent';
import { createParticipationByEventController } from '../main/Participation/createParticipationByEvent';
import { findParticipationsRequestController } from '../main/Participation/findParticipationsRequest';
import { createParticipationInviteController } from '../main/Participation/createParticipationInvite';
import { createParticipationInviteMiddleware } from '../middlewares/validators/Participation/createParticipationInvite';

const participationRouter = Router();

participationRouter.post(
  '/participation/user',
  [verifyToken, createParticipationByUserMiddleware],
  async (req: Request, res: Response) => {
    return createParticipationByUserController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/event',
  [verifyToken, createParticipationByEventMiddleware],
  async (req: Request, res: Response) => {
    return createParticipationByEventController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/invite',
  [verifyToken, createParticipationInviteMiddleware],
  async (req: Request, res: Response) => {
    return createParticipationInviteController.handle(req, res);
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
    return findParticipationsByUserController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/user/:event_id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findParticipationByEventIdController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/requests/:event_id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findParticipationsRequestController.handle(req, res);
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
