import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import {
  verifyParamEventId,
  verifyParamUserId,
} from '../middlewares/verifyParamId';
import { findAchievementsByEventIdController } from '../main/Achievement/findAchievementsByEventId';
import { findAchievementsByUserIdController } from '../main/Achievement/findAchievementsByUserId';

const achievementRouter = Router();

achievementRouter.get(
  '/achievement/event/:event_id',
  [verifyToken, verifyParamEventId],
  async (req: Request, res: Response) => {
    return findAchievementsByEventIdController.handle(req, res);
  },
);

achievementRouter.get(
  '/achievement/user/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return findAchievementsByUserIdController.handle(req, res);
  },
);

export { achievementRouter };
