import { Router } from 'express';

import { userRouter } from './routes/user';
import { authRouter } from './routes/auth';
import { meetingRouter } from './routes/meeting';
import { participationRouter } from './routes/participation';

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(meetingRouter);
router.use(participationRouter);

export { router };
