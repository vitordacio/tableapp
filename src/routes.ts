import { Router } from 'express';

import { userRouter } from './routes/user';
import { authRouter } from './routes/auth';
import { eventRouter } from './routes/event';
import { participationRouter } from './routes/participation';

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(eventRouter);
router.use(participationRouter);

export { router };
