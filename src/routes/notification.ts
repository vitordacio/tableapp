import { Request, Response, Router } from 'express';
import { deleteNotificationController } from '../main/Notification/deleteNotification';
import { findNotificationByIdController } from '../main/Notification/findNotificationById';
import { findNotificationIndexController } from '../main/Notification/findNotificationIndex';
import { verifyToken } from '../middlewares/verifyToken';

const notificationRouter = Router();

notificationRouter.get(
  '/notification',
  verifyToken,
  async (req: Request, res: Response) => {
    return findNotificationIndexController.handle(req, res);
  },
);

notificationRouter.get(
  '/notification/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findNotificationByIdController.handle(req, res);
  },
);

notificationRouter.delete(
  '/notification/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteNotificationController.handle(req, res);
  },
);

export { notificationRouter };
