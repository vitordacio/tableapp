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
  updateBioMiddleware,
  updateLocationMiddleware,
  updateGenderMiddleware,
  updateNameMiddleware,
  updateSocialMiddleware,
} from '../middlewares/validators/User/updateGenerals';
import { updateBioController } from '../main/User/updateGenerals/updateBio';
import { updateLocationController } from '../main/User/updateGenerals/updateLocation';
import { updateGenderController } from '../main/User/updateGenerals/updateGender';
import { updateNameController } from '../main/User/updateGenerals/updateName';
import { updateSocialController } from '../main/User/updateGenerals/updateSocial';

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
  '/user/social',
  [verifyToken, updateSocialMiddleware],
  async (req: Request, res: Response) => {
    return updateSocialController.handle(req, res);
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
