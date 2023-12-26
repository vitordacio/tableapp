import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

import { createEventTypeMiddleware } from '../middlewares/validators/Type/EventType/createEventType';
import { createSocialNetworkTypeMiddleware } from '../middlewares/validators/Type/SocialNetworkType/createSocialNetworkType';

import { findEventTypesController } from '../main/Type/EventType/findEventTypes';
import { createSocialNetworkTypeController } from '../main/Type/SocialNetworkType/createSocialNetworkType';
import { fetchSocialNetworkTypesController } from '../main/Type/SocialNetworkType/fetchSocialNetworkTypes';
import { deleteSocialNetworkTypeController } from '../main/Type/SocialNetworkType/deleteSocialNetworkType';
import { findSocialNetworkTypesController } from '../main/Type/SocialNetworkType/findSocialNetworkTypes';
import { createEventTypeController } from '../main/Type/EventType/createEventType';
import { deleteEventTypeController } from '../main/Type/EventType/deleteEventType';
import { fetchEventTypesController } from '../main/Type/EventType/fetchEventTypes';
import { createParticipationTypeController } from '../main/Type/ParticipationType/createParticipationType';
import { deleteParticipationTypeController } from '../main/Type/ParticipationType/deleteParticipationType';
import { fetchParticipationTypesController } from '../main/Type/ParticipationType/fetchParticipationTypes';
import { findParticipationTypesController } from '../main/Type/ParticipationType/findParticipationTypes';
import { createParticipationTypeMiddleware } from '../middlewares/validators/Participation/createParticipationType';
import { createEmojiTypeController } from '../main/Type/EmojiType/createEmojiType';
import { deleteEmojiTypeController } from '../main/Type/EmojiType/deleteEmojiType';
import { fetchEmojiTypesController } from '../main/Type/EmojiType/fetchEmojiTypes';
import { findEmojiTypesController } from '../main/Type/EmojiType/findEmojiTypes';
import { createEmojiTypeMiddleware } from '../middlewares/validators/Type/EmojiType/createEmojiType';

const typeRouter = Router();

// Emojis
typeRouter.get(
  '/type/emoji',
  verifyToken,
  async (req: Request, res: Response) => {
    return findEmojiTypesController.handle(req, res);
  },
);

typeRouter.post(
  '/type/emoji',
  [verifyToken, createEmojiTypeMiddleware],
  async (req: Request, res: Response) => {
    return createEmojiTypeController.handle(req, res);
  },
);

typeRouter.post(
  '/type/emoji/fetch',
  verifyToken,
  async (req: Request, res: Response) => {
    return fetchEmojiTypesController.handle(req, res);
  },
);

typeRouter.delete(
  '/type/emoji/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteEmojiTypeController.handle(req, res);
  },
);

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
    return fetchEventTypesController.handle(req, res);
  },
);

typeRouter.delete(
  '/type/event/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteEventTypeController.handle(req, res);
  },
);

// Participations
typeRouter.get(
  '/type/participation',
  verifyToken,
  async (req: Request, res: Response) => {
    return findParticipationTypesController.handle(req, res);
  },
);

typeRouter.post(
  '/type/participation',
  [verifyToken, createParticipationTypeMiddleware],
  async (req: Request, res: Response) => {
    return createParticipationTypeController.handle(req, res);
  },
);

typeRouter.post(
  '/type/participation/fetch',
  verifyToken,
  async (req: Request, res: Response) => {
    return fetchParticipationTypesController.handle(req, res);
  },
);

typeRouter.delete(
  '/type/participation/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteParticipationTypeController.handle(req, res);
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
    return fetchSocialNetworkTypesController.handle(req, res);
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
