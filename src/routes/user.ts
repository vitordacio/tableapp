import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { verifyParamUserId } from '../middlewares/verifyParamId';
import { createUserMiddleware } from '../middlewares/validators/User/createUser';
import { createSocialNetworkMiddleware } from '../middlewares/validators/User/createSocialNetwork';

import { createUserController } from '../main/User/createUser';
import { deleteUserController } from '../main/User/deleteUser';

import { findUserIndexController } from '../main/User/findUserIndex';
import { findUserdByIdController } from '../main/User/findUserById';
import { findUsersByNameMiddleware } from '../middlewares/validators/User/findUsersByName';
import { findUsersByNameController } from '../main/User/findUsersByName';

import { updateUsernameController } from '../main/User/updateGenerals/updateUsername';
import { updateEmailController } from '../main/User/updateGenerals/updateEmail';
import { updatePasswordController } from '../main/User/updateGenerals/updatePassword';
import { updatePrivateController } from '../main/User/updateGenerals/updatePrivate';
import {
  updateUsernameMiddleware,
  updateEmailMiddleware,
  updatePasswordMiddleware,
  updatePrivateMiddleware,
  updateBioMiddleware,
  updateLocationMiddleware,
  updateGenderMiddleware,
  updateNameMiddleware,
} from '../middlewares/validators/User/updateGenerals';
import { updateBioController } from '../main/User/updateGenerals/updateBio';
import { updateLocationController } from '../main/User/updateGenerals/updateLocation';
import { updateGenderController } from '../main/User/updateGenerals/updateGender';
import { updateNameController } from '../main/User/updateGenerals/updateName';
import { findUserFriendsMiddleware } from '../middlewares/validators/User/findUserFriends';
import { findUserFriendsController } from '../main/User/findUserFriends';
import { createSocialNetworkController } from '../main/User/updateGenerals/createSocialNetwork';
import { deleteSocialNetworkController } from '../main/User/updateGenerals/deleteSocialNetwork';
import { findCheckUpdateController } from '../main/User/findCheckUpdate';
import { findCheckUpdateMiddleware } from '../middlewares/validators/User/findCheckUpdate';

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
    return findUsersByNameController.handle(req, res);
  },
);

userRouter.get(
  '/user/check-update/:type',
  [verifyToken, findCheckUpdateMiddleware],
  async (req: Request, res: Response) => {
    return findCheckUpdateController.handle(req, res);
  },
);

userRouter.get(
  '/user/friends/:user_id',
  [verifyToken, findUserFriendsMiddleware, verifyParamUserId],
  async (req: Request, res: Response) => {
    return findUserFriendsController.handle(req, res);
  },
);

userRouter.get(
  '/user/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return findUserdByIdController.handle(req, res);
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
  '/user/name',
  [verifyToken, updateNameMiddleware],
  async (req: Request, res: Response) => {
    return updateNameController.handle(req, res);
  },
);

userRouter.put(
  '/user/bio',
  [verifyToken, updateBioMiddleware],
  async (req: Request, res: Response) => {
    return updateBioController.handle(req, res);
  },
);

userRouter.put(
  '/user/location',
  [verifyToken, updateLocationMiddleware],
  async (req: Request, res: Response) => {
    return updateLocationController.handle(req, res);
  },
);

userRouter.put(
  '/user/gender',
  [verifyToken, updateGenderMiddleware],
  async (req: Request, res: Response) => {
    return updateGenderController.handle(req, res);
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

userRouter.post(
  '/user/social',
  [verifyToken, createSocialNetworkMiddleware],
  async (req: Request, res: Response) => {
    return createSocialNetworkController.handle(req, res);
  },
);

userRouter.delete(
  '/user/social/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteSocialNetworkController.handle(req, res);
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
