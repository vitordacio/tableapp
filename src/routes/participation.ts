import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { createParticipationController } from '../main/Participation/createParticipation';
import { createParticipationMiddleware } from '../middlewares/validators/Participation/createParticipation';

const participationRouter = Router();

participationRouter.post(
  '/participation',
  [verifyToken, createParticipationMiddleware],
  async (req: Request, res: Response) => {
    return createParticipationController.handle(req, res);
  },
);

// participationRouter.put(
//   '/user',
//   [verifyToken, updateUserMiddleware],
//   async (req: Request, res: Response) => {
//     return updateUserController.handle(req, res);
//   },
// );

export { participationRouter };
