import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

import { createSocialNetworkTypeController } from '../main/SocialNetworkType/createSocialNetworkType';
import { deleteSocialNetworkTypeController } from '../main/SocialNetworkType/deleteSocialNetworkType';
import { createSocialNetworkTypeMiddleware } from '../middlewares/validators/SocialNetworkType/createSocialNetworkType';
import { findSocialNetworkTypesController } from '../main/SocialNetworkType/findSocialNetworkTypes';

const socialNetworkRouter = Router();

socialNetworkRouter.get(
  '/social/type',
  verifyToken,
  async (req: Request, res: Response) => {
    return findSocialNetworkTypesController.handle(req, res);
  },
);

socialNetworkRouter.post(
  '/social/type',
  [verifyToken, createSocialNetworkTypeMiddleware],
  async (req: Request, res: Response) => {
    return createSocialNetworkTypeController.handle(req, res);
  },
);

socialNetworkRouter.delete(
  '/social/type/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteSocialNetworkTypeController.handle(req, res);
  },
);

export { socialNetworkRouter };
