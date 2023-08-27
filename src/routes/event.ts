import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

import { findEventIndexController } from '../main/Event/findEventIndex';
import { findEventByIdController } from '../main/Event/findEventById';
import { createEventController } from '../main/Event/createEvent';
import { deleteEventController } from '../main/Event/deleteEvent';
import { createEventMiddleware } from '../middlewares/validators/Event/createEvent';
import { updateEventMiddleware } from '../middlewares/validators/Event/updateEvent';
import { updateEventController } from '../main/Event/updateEvent';

const eventRouter = Router();

eventRouter.post(
  '/event',
  [verifyToken, createEventMiddleware],
  async (req: Request, res: Response) => {
    return createEventController.handle(req, res);
  },
);

eventRouter.get('/event', verifyToken, async (req: Request, res: Response) => {
  return findEventIndexController.handle(req, res);
});

eventRouter.get(
  '/event/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findEventByIdController.handle(req, res);
  },
);

eventRouter.put(
  '/event/:id',
  [verifyToken, updateEventMiddleware],
  async (req: Request, res: Response) => {
    return updateEventController.handle(req, res);
  },
);

eventRouter.delete(
  '/event/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteEventController.handle(req, res);
  },
);

export { eventRouter };
