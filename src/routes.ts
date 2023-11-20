import { Router } from 'express';

import { userRouter } from './routes/user';
import { authRouter } from './routes/auth';
import { addressRouter } from './routes/address';
import { eventRouter } from './routes/event';
import { participationRouter } from './routes/participation';
import { friendshipRouter } from './routes/friendship';
import { notificationRouter } from './routes/notification';
import { socialNetworkRouter } from './routes/social_network';

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(addressRouter);
router.use(eventRouter);
router.use(participationRouter);
router.use(friendshipRouter);
router.use(notificationRouter);
router.use(socialNetworkRouter);

export { router };
