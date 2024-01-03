import { Router } from 'express';

import { addressRouter } from './routes/address';
import { authRouter } from './routes/auth';
import { blockRouter } from './routes/block';
import { emojiRouter } from './routes/emoji';
import { eventRouter } from './routes/event';
import { friendshipRouter } from './routes/friendship';
import { momentRouter } from './routes/moment';
import { notificationRouter } from './routes/notification';
import { participationRouter } from './routes/participation';
import { reactRouter } from './routes/react';
import { reportRouter } from './routes/report';
import { suggestionRouter } from './routes/suggestion';
import { typeRouter } from './routes/type';
import { userRouter } from './routes/user';

const router = Router();

router.use(addressRouter);
router.use(authRouter);
router.use(blockRouter);
router.use(emojiRouter);
router.use(eventRouter);
router.use(friendshipRouter);
router.use(momentRouter);
router.use(notificationRouter);
router.use(participationRouter);
router.use(reactRouter);
router.use(reportRouter);
router.use(suggestionRouter);
router.use(typeRouter);
router.use(userRouter);

export { router };
