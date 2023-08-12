import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { createParticipationRequestController } from '../main/Participation/createParticipationRequest';
import { createParticipationRequestMiddleware } from '../middlewares/validators/Participation/createParticipationRequest';
import { findParticipationByIdController } from '../main/Participation/findParticipationById';
import { deleteParticipationController } from '../main/Participation/deleteParticipation';
import { findParticipationIndexController } from '../main/Participation/findParticipationIndex';
import { createParticipationModMiddleware } from '../middlewares/validators/Participation/createParticipationMod';
import { createParticipationResponseMiddleware } from '../middlewares/validators/Participation/createParticipationResponse';
import { createTypeMiddleware } from '../middlewares/validators/Type/createType';
import { createParticipationTypeController } from '../main/ParticipationType/createParticipationType';
import { deleteParticipationTypeController } from '../main/ParticipationType/deleteParticipationType';
import { createParticipationResponseController } from '../main/Participation/createParticipationResponse';
import { findParticipationTypeIndexController } from '../main/ParticipationType/findParticipationTypeIndex';
import { createParticipationModController } from '../main/Participation/createParticipationMod';

const participationRouter = Router();

participationRouter.post(
  '/participation/request',
  [verifyToken, createParticipationRequestMiddleware],
  async (req: Request, res: Response) => {
    return createParticipationRequestController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/response',
  [verifyToken, createParticipationResponseMiddleware],
  async (req: Request, res: Response) => {
    return createParticipationResponseController.handle(req, res);
  },
);

participationRouter.post(
  '/participation/mod',
  [verifyToken, createParticipationModMiddleware],
  async (req: Request, res: Response) => {
    return createParticipationModController.handle(req, res);
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

participationRouter.get(
  '/participation',
  verifyToken,
  async (req: Request, res: Response) => {
    return findParticipationIndexController.handle(req, res);
  },
);

participationRouter.post(
  '/participation_type',
  [verifyToken, createTypeMiddleware],
  async (req: Request, res: Response) => {
    return createParticipationTypeController.handle(req, res);
  },
);

participationRouter.get(
  '/participation_type',
  verifyToken,
  async (req: Request, res: Response) => {
    return findParticipationTypeIndexController.handle(req, res);
  },
);

participationRouter.delete(
  '/participation_type/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteParticipationTypeController.handle(req, res);
  },
);

export { participationRouter };
