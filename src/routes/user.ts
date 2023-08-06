import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { createUserMiddleware } from '../middlewares/validators/User/createUser';
import { updateUserMiddleware } from '../middlewares/validators/User/updateUser';

import { createUserController } from '../main/User/createUser';
import { updateUserController } from '../main/User/updateUser';

const userRouter = Router();

userRouter.post('/user', createUserMiddleware, async (req, res) => {
  return createUserController.handle(req, res);
});

userRouter.put(
  '/user',
  [verifyToken, updateUserMiddleware],
  async (req: Request, res: Response) => {
    return updateUserController.handle(req, res);
  },
);

export { userRouter };
