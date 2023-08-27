import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { createUserMiddleware } from '../middlewares/validators/User/createUser';
import { updateUserMiddleware } from '../middlewares/validators/User/updateUser';

import { createUserController } from '../main/User/createUser';
import { updateUserController } from '../main/User/updateUser';
import { deleteUserController } from '../main/User/deleteUser';

import { findUserIndexController } from '../main/User/findUserIndex';

const userRouter = Router();

userRouter.get('/user', verifyToken, async (req: Request, res: Response) => {
  return findUserIndexController.handle(req, res);
});

userRouter.post(
  '/user',
  createUserMiddleware,
  async (req: Request, res: Response) => {
    return createUserController.handle(req, res);
  },
);

userRouter.put(
  '/user',
  [verifyToken, updateUserMiddleware],
  async (req: Request, res: Response) => {
    return updateUserController.handle(req, res);
  },
);

userRouter.delete(
  '/user/self',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteUserController.handle(req, res);
  },
);

export { userRouter };
