import { Router } from 'express';

import { userRouter } from './routes/user';
import { authRouter } from './routes/auth';
import { addressRouter } from './routes/address';
import { eventRouter } from './routes/event';
import { emojiRouter } from './routes/emoji';
import { reactRouter } from './routes/react';
import { participationRouter } from './routes/participation';
import { friendshipRouter } from './routes/friendship';
import { notificationRouter } from './routes/notification';
import { typeRouter } from './routes/type';

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(typeRouter);
router.use(addressRouter);
router.use(eventRouter);
router.use(emojiRouter);
router.use(reactRouter);
router.use(participationRouter);
router.use(friendshipRouter);
router.use(notificationRouter);

export { router };
