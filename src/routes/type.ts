import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

import { createEventTypeMiddleware } from '../middlewares/validators/Event/createEventType';
import { createEventTypeController } from '../main/Event/createEventType';
import { deleteEventTypeController } from '../main/Event/deleteEventType';
import { findEventTypesController } from '../main/Type/EventType/findEventTypes';

import { createSocialNetworkTypeMiddleware } from '../middlewares/validators/Type/SocialNetworkType/createSocialNetworkType';
import { createSocialNetworkTypeController } from '../main/Type/SocialNetworkType/createSocialNetworkType';
import { deleteSocialNetworkTypeController } from '../main/Type/SocialNetworkType/deleteSocialNetworkType';
import { findSocialNetworkTypesController } from '../main/Type/SocialNetworkType/findSocialNetworkTypes';

const typeRouter = Router();

// Events
typeRouter.get(
  '/type/event',
  verifyToken,
  async (req: Request, res: Response) => {
    return findEventTypesController.handle(req, res);
  },
);

typeRouter.post(
  '/type/event',
  [verifyToken, createEventTypeMiddleware],
  async (req: Request, res: Response) => {
    return createEventTypeController.handle(req, res);
  },
);

typeRouter.post(
  '/type/event/fetch',
  verifyToken,
  async (req: Request, res: Response) => {
    return createEventTypeController.handle(req, res);
  },
);

typeRouter.delete(
  '/type/event/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteEventTypeController.handle(req, res);
  },
);

// Social Networks
typeRouter.get(
  '/type/social',
  verifyToken,
  async (req: Request, res: Response) => {
    return findSocialNetworkTypesController.handle(req, res);
  },
);

typeRouter.post(
  '/type/social',
  [verifyToken, createSocialNetworkTypeMiddleware],
  async (req: Request, res: Response) => {
    return createSocialNetworkTypeController.handle(req, res);
  },
);

typeRouter.post(
  '/type/social/fetch',
  verifyToken,
  async (req: Request, res: Response) => {
    return createSocialNetworkTypeController.handle(req, res);
  },
);

typeRouter.delete(
  '/type/social/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteSocialNetworkTypeController.handle(req, res);
  },
);

export { typeRouter };
