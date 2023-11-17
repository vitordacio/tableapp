import { Router } from 'express';

import { verifyToken } from 'src/middlewares/verifyToken';
import { loginMiddleware } from '../middlewares/validators/Authorization/login';

import { loginMasterController } from '../main/Authorization/loginMaster';
import { loginUserController } from '../main/Authorization/loginUser';
import { loginPubController } from '../main/Authorization/loginPub';
import { loginGoogleController } from '../main/Authorization/loginGoogle';

const authRouter = Router();

authRouter.post('/auth/master', loginMiddleware, async (req, res) => {
  return loginMasterController.handle(req, res);
});

authRouter.post('/auth/user', loginMiddleware, async (req, res) => {
  return loginUserController.handle(req, res);
});

authRouter.post('/auth/google', async (req, res) => {
  return loginGoogleController.handle(req, res);
});

authRouter.post('/auth/pub', loginMiddleware, async (req, res) => {
  return loginPubController.handle(req, res);
});

authRouter.post('/auth/token', verifyToken, async (req, res) => {
  return loginPubController.handle(req, res);
});

export { authRouter };
