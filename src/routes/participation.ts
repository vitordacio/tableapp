import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';

import { createParticipationByUserController } from '../main/Participation/createParticipationByUser';
import { findParticipationByIdController } from '../main/Participation/findParticipationById';
import { deleteParticipationController } from '../main/Participation/deleteParticipation';
import { findParticipationsByUserIdController } from '../main/Participation/findParticipationsByUserId';
import { findParticipationsByUserIdMiddleware } from '../middlewares/validators/Participation/findParticipationsByUserId';
import { findParticipationsByEventIdController } from '../main/Participation/findParticipationsByEventId';
import { findParticipationsByEventIdMiddleware } from '../middlewares/validators/Participation/findParticipationsByEventId';
import { createParticipationByEventController } from '../main/Participation/createParticipationByEvent';
import { findParticipationsRequestController } from '../main/Participation/findParticipationsRequest';
import { createInviteRequestController } from '../main/Participation/createInviteRequest';
import { createInviteRequestMiddleware } from '../middlewares/validators/Participation/createInviteRequest';
import { createInviteResponseController } from '../main/Participation/createInviteResponse';

const participationRouter = Router();

participationRouter.post(
  '/participation/user/:event_id',
  verifyToken,
  async (req: Request, res: Response) => {
    return createParticipationByUserController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/event/:participation_id',
  verifyToken,
  async (req: Request, res: Response) => {
    return createParticipationByEventController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/invite/request',
  [verifyToken, createInviteRequestMiddleware],
  async (req: Request, res: Response) => {
    return createInviteRequestController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/invite/response/:event_id',
  verifyToken,
  async (req: Request, res: Response) => {
    return createInviteResponseController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/user/:user_id',
  [verifyToken, findParticipationsByUserIdMiddleware],
  async (req: Request, res: Response) => {
    return findParticipationsByUserIdController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/event/:event_id',
  [verifyToken, findParticipationsByEventIdMiddleware],
  async (req: Request, res: Response) => {
    return findParticipationsByEventIdController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/requests/:event_id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findParticipationsRequestController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findParticipationByIdController.handle(req, res);
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
