import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { createUserMiddleware } from '../middlewares/validators/User/createUser';
import { updateUserMiddleware } from '../middlewares/validators/User/updateUser';

import { createUserController } from '../main/User/createUser';
import { updateUserController } from '../main/User/updateUser';
import { deleteUserController } from '../main/User/deleteUser';

import { findUserIndexController } from '../main/User/findUserIndex';
import { findUserdByIdController } from '../main/User/findUserById';
import { findUsersByNameMiddleware } from '../middlewares/validators/User/findUsersByName';
import { findUserdByNameController } from '../main/User/findUserByName';

const userRouter = Router();

userRouter.get('/user', verifyToken, async (req: Request, res: Response) => {
  return findUserIndexController.handle(req, res);
});

userRouter.get(
  '/user/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findUserdByIdController.handle(req, res);
  },
);

userRouter.get(
  '/username',
  [verifyToken, findUsersByNameMiddleware],
  async (req: Request, res: Response) => {
    return findUserdByNameController.handle(req, res);
  },
);

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
