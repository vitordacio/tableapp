import { Router } from 'express';

import { loginMiddleware } from '../middlewares/validators/Authorization/login';

import { loginMasterController } from '../main/Authorization/loginMaster';
import { loginUserController } from '../main/Authorization/loginUser';
import { loginPubController } from '../main/Authorization/loginPub';

const authRouter = Router();

authRouter.post('/auth/master', loginMiddleware, async (req, res) => {
  return loginMasterController.handle(req, res);
});

authRouter.post('/auth/user', loginMiddleware, async (req, res) => {
  return loginUserController.handle(req, res);
});

authRouter.post('/auth/pub', loginMiddleware, async (req, res) => {
  return loginPubController.handle(req, res);
});

export { authRouter };
