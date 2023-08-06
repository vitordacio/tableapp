import { Router } from 'express';

import { loginUserController } from '../main/Authorization/loginUser';

import { loginUserMiddleware } from '../middlewares/validators/Authorization/loginUser';

const authRouter = Router();

authRouter.post('/auth/user', loginUserMiddleware, async (req, res) => {
  return loginUserController.handle(req, res);
});

export { authRouter };
