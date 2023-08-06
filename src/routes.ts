import { Router } from 'express';

import { userRouter } from './routes/user';
import { authRouter } from './routes/auth';

const router = Router();

router.use(userRouter);
router.use(authRouter);

export { router };
