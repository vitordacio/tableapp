import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { createRequestController } from '../main/Friendship/createRequest';
import { findFriendshipByIdController } from '../main/Friendship/findFriendshipById';
import { deleteFriendshipController } from '../main/Friendship/deleteFriendship';
import { createResponseController } from '../main/Friendship/createResponse';
import {
  verifyParamFriendshipId,
  verifyParamUserId,
} from '../middlewares/verifyParamId';

const friendshipRouter = Router();

friendshipRouter.post(
  '/friendship/request/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return createRequestController.handle(req, res);
  },
);

friendshipRouter.post(
  '/friendship/response/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return createResponseController.handle(req, res);
  },
);

// friendshipRouter.get(
//   '/friendship/user/:user_id',
//   [verifyToken, verifyParamUserId],
//   async (req: Request, res: Response) => {
//     return findFriendshipByUserIdController.handle(req, res);
//   },
// );

friendshipRouter.get(
  '/friendship/:friendship_id',
  [verifyToken, verifyParamFriendshipId],
  async (req: Request, res: Response) => {
    return findFriendshipByIdController.handle(req, res);
  },
);

friendshipRouter.delete(
  '/friendship/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return deleteFriendshipController.handle(req, res);
  },
);

export { friendshipRouter };
