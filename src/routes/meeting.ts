import { Request, Response, Router } from 'express';
import { createMeetingController } from '../main/Meeting/createMeeting';
import { verifyToken } from '../middlewares/verifyToken';
import { createMeetingMiddleware } from '../middlewares/validators/Meeting/createMeeting';
import { findMeetingController } from '../main/Meeting/findMeeting';
import { createTypeMiddleware } from '../middlewares/validators/Type/createType';
import { createMeetingTypeController } from '../main/MeetingType/createMeetingType';

const meetingRouter = Router();

meetingRouter.post(
  '/meeting',
  [verifyToken, createMeetingMiddleware],
  async (req: Request, res: Response) => {
    return createMeetingController.handle(req, res);
  },
);

meetingRouter.get(
  '/meeting/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findMeetingController.handle(req, res);
  },
);

meetingRouter.post(
  '/meeting/type',
  [verifyToken, createTypeMiddleware],
  async (req: Request, res: Response) => {
    return createMeetingTypeController.handle(req, res);
  },
);

// MeetingRouter.put(
//   '/user',
//   [verifyToken, updateUserMiddleware],
//   async (req: Request, res: Response) => {
//     return updateUserController.handle(req, res);
//   },
// );

export { meetingRouter };
