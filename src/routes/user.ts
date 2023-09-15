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
import { findUserByNameController } from '../main/User/findUserByName';
import { findCheckUsernameController } from '../main/User/findCheckUsername';
import { updateUsernameController } from '../main/User/updateGenerals/updateUsername';
import { updateEmailController } from '../main/User/updateGenerals/updateEmail';
import { updatePasswordController } from '../main/User/updateGenerals/updatePassword';
import { updatePrivateController } from '../main/User/updateGenerals/updatePrivate';
import {
  updateUsernameMiddleware,
  updateEmailMiddleware,
  updatePasswordMiddleware,
  updatePrivateMiddleware,
} from '../middlewares/validators/User/updateGenerals';

const userRouter = Router();

userRouter.post(
  '/user',
  createUserMiddleware,
  async (req: Request, res: Response) => {
    return createUserController.handle(req, res);
  },
);

userRouter.get('/user', verifyToken, async (req: Request, res: Response) => {
  return findUserIndexController.handle(req, res);
});

userRouter.get(
  '/user/search',
  [verifyToken, findUsersByNameMiddleware],
  async (req: Request, res: Response) => {
    return findUserByNameController.handle(req, res);
  },
);

userRouter.get(
  '/user/check-username/:username',
  async (req: Request, res: Response) => {
    return findCheckUsernameController.handle(req, res);
  },
);

userRouter.get(
  '/user/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findUserdByIdController.handle(req, res);
  },
);

userRouter.put(
  '/user',
  [verifyToken, updateUserMiddleware],
  async (req: Request, res: Response) => {
    return updateUserController.handle(req, res);
  },
);

userRouter.put(
  '/user/username',
  [verifyToken, updateUsernameMiddleware],
  async (req: Request, res: Response) => {
    return updateUsernameController.handle(req, res);
  },
);

userRouter.put(
  '/user/email',
  [verifyToken, updateEmailMiddleware],
  async (req: Request, res: Response) => {
    return updateEmailController.handle(req, res);
  },
);

userRouter.put(
  '/user/password',
  [verifyToken, updatePasswordMiddleware],
  async (req: Request, res: Response) => {
    return updatePasswordController.handle(req, res);
  },
);

userRouter.put(
  '/user/private',
  [verifyToken, updatePrivateMiddleware],
  async (req: Request, res: Response) => {
    return updatePrivateController.handle(req, res);
  },
);

// userRouter.put(
//   '/user/picture',
//   [verifyToken, updateUserMiddleware],
//   async (req: Request, res: Response) => {
//     return updateUserController.handle(req, res);
//   },
// );

// userRouter.put(
//   '/user/cover_photo',
//   [verifyToken, updateUserMiddleware],
//   async (req: Request, res: Response) => {
//     return updateUserController.handle(req, res);
//   },
// );

userRouter.delete(
  '/user/self',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteUserController.handle(req, res);
  },
);

export { userRouter };
