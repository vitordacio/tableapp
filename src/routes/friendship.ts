import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { createRequestController } from '../main/Friendship/createRequest';
import { findFriendshipByIdController } from '../main/Friendship/findFriendshipById';
import { deleteFriendshipController } from '../main/Friendship/deleteFriendship';
import { createResponseController } from '../main/Friendship/createResponse';
import { findFriendshipByUserIdController } from '../main/Friendship/findFriendshipByUserId';

const friendshipRouter = Router();

friendshipRouter.post(
  '/friendship/request/:friend_id',
  verifyToken,
  async (req: Request, res: Response) => {
    return createRequestController.handle(req, res);
  },
);

friendshipRouter.post(
  '/friendship/response/:friend_id',
  verifyToken,
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
  '/friendship/:friend_id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteFriendshipController.handle(req, res);
  },
);

export { friendshipRouter };
