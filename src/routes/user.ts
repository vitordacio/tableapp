import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { verifyParamId } from '../middlewares/verifyParamId';
import { createUserMiddleware } from '../middlewares/validators/User/createUser';
import { createSocialNetworkMiddleware } from '../middlewares/validators/User/createSocialNetwork';

import { createUserController } from '../main/User/createUser';
import { deleteUserController } from '../main/User/deleteUser';

import { findUserIndexController } from '../main/User/findUserIndex';
import { findUserdByIdController } from '../main/User/findUserById';
import { findUsersByNameMiddleware } from '../middlewares/validators/User/findUsersByName';
import { findUsersByNameController } from '../main/User/findUsersByName';
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
  updateBioMiddleware,
  updateLocationMiddleware,
  updateGenderMiddleware,
  updateNameMiddleware,
} from '../middlewares/validators/User/updateGenerals';
import { updateBioController } from '../main/User/updateGenerals/updateBio';
import { updateLocationController } from '../main/User/updateGenerals/updateLocation';
import { updateGenderController } from '../main/User/updateGenerals/updateGender';
import { updateNameController } from '../main/User/updateGenerals/updateName';
import { findFriendsMiddleware } from '../middlewares/validators/User/findFriends';
import { findFriendsController } from '../main/User/findFriends';
import { createSocialNetworkController } from '../main/User/updateGenerals/createSocialNetwork';
import { deleteSocialNetworkController } from '../main/User/updateGenerals/deleteSocialNetwork';

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
  '/user/check-username/:username',
  async (req: Request, res: Response) => {
    return findCheckUsernameController.handle(req, res);
  },
);

userRouter.get(
  '/user/friends/:id',
  [verifyToken, findFriendsMiddleware],
  async (req: Request, res: Response) => {
    return findFriendsController.handle(req, res);
  },
);

userRouter.get(
  '/user/:id',
  [verifyToken, verifyParamId],
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
