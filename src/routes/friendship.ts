import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { createRequestController } from '../main/Friendship/createRequest';
import { createRequestMiddleware } from '../middlewares/validators/Friendship/createRequest';
import { findFriendshipByIdController } from '../main/Friendship/findFriendshipById';
import { deleteFriendshipController } from '../main/Friendship/deleteFriendship';
import { createResponseController } from '../main/Friendship/createResponse';
import { createResponseMiddleware } from '../middlewares/validators/Friendship/createResponse';
import { findFriendshipByUserIdController } from '../main/Friendship/findFriendshipByUserId';

const friendshipRouter = Router();

friendshipRouter.post(
  '/friendship/request',
  [verifyToken, createRequestMiddleware],
  async (req: Request, res: Response) => {
    return createRequestController.handle(req, res);
  },
);

friendshipRouter.post(
  '/friendship/response',
  [verifyToken, createResponseMiddleware],
  async (req: Request, res: Response) => {
    return createResponseController.handle(req, res);
  },
);

friendshipRouter.get(
  '/friendship/user/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findFriendshipByUserIdController.handle(req, res);
  },
);

friendshipRouter.get(
  '/friendship/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findFriendshipByIdController.handle(req, res);
  },
);

friendshipRouter.delete(
  '/friendship/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteFriendshipController.handle(req, res);
  },
);

export { friendshipRouter };
