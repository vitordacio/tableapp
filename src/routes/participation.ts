import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { createInviteRequestMiddleware } from '../middlewares/validators/Participation/createInviteRequest';
import { findParticipationByEventAndUserMiddleware } from '../middlewares/validators/Participation/findParticipationByEventAndUser';

import { createParticipationByUserController } from '../main/Participation/createParticipationByUser';
import { findParticipationByIdController } from '../main/Participation/findParticipationById';
import { deleteParticipationController } from '../main/Participation/deleteParticipation';
import { findParticipationsByUserIdController } from '../main/Participation/findParticipationsByUserId';
import { findParticipationsByEventIdController } from '../main/Participation/findParticipationsByEventId';
import { createParticipationByEventController } from '../main/Participation/createParticipationByEvent';
import { createInviteRequestController } from '../main/Participation/createInviteRequest';
import { createInviteResponseController } from '../main/Participation/createInviteResponse';
import { findParticipationByEventAndUserController } from '../main/Participation/findParticipationByEventAndUser';
import { findRequestsPendingController } from '../main/Participation/findRequestsPending';
import { findRequestsReviwedController } from '../main/Participation/findRequestsReviwed';
import { createParticipationResponseMiddleware } from '../middlewares/validators/Participation/createParticipationResponse';
import { verifyPageLimit } from '../middlewares/verifyPageLimit';
import {
  verifyParamEventId,
  verifyParamParticipationId,
  verifyParamUserId,
} from '../middlewares/verifyParamId';

const participationRouter = Router();

participationRouter.post(
  '/participation/user/:event_id',
  [verifyToken, verifyParamEventId],
  async (req: Request, res: Response) => {
    return createParticipationByUserController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/event',
  [verifyToken, createParticipationResponseMiddleware],
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
  [verifyToken, verifyParamEventId],
  async (req: Request, res: Response) => {
    return createInviteResponseController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/check/:event_id/:user_id',
  [verifyToken, findParticipationByEventAndUserMiddleware],
  async (req: Request, res: Response) => {
    return findParticipationByEventAndUserController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/user/:user_id',
  [verifyToken, verifyParamUserId, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findParticipationsByUserIdController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/event/:event_id',
  [verifyToken, verifyParamEventId, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findParticipationsByEventIdController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/requests/pending/:event_id',
  [verifyToken, verifyParamEventId, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findRequestsPendingController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/requests/reviwed/:event_id',
  [verifyToken, verifyParamEventId, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findRequestsReviwedController.handle(req, res);
  },
);

participationRouter.get(
  '/participation/:participation_id',
  [verifyToken, verifyParamParticipationId],
  async (req: Request, res: Response) => {
    return findParticipationByIdController.handle(req, res);
  },
);

participationRouter.delete(
  '/participation/:participation_id',
  [verifyToken, verifyParamParticipationId],
  async (req: Request, res: Response) => {
    return deleteParticipationController.handle(req, res);
  },
);

export { participationRouter };
