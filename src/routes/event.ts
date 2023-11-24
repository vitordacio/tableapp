import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

import { findEventIndexController } from '../main/Event/findEventIndex';
import { findEventByIdController } from '../main/Event/findEventById';
import { createEventController } from '../main/Event/createEvent';
import { deleteEventController } from '../main/Event/deleteEvent';

import { updateEventMiddleware } from '../middlewares/validators/Event/updateEvent';
import { updateEventController } from '../main/Event/updateEvent';
import { findEventByLocationMiddleware } from '../middlewares/validators/Event/findEventByLocation';
import { findEventByLocationController } from '../main/Event/findEventByLocation';
import { createEventMiddleware } from '../middlewares/validators/Event/createEvent';
import { updateEventActivedController } from '../main/Event/updateEventActived';
import { updateEventActivedMiddleware } from '../middlewares/validators/Event/updateEventActived';
import { createEventTypeController } from '../main/Event/createEventType';
import { deleteEventTypeController } from '../main/Event/deleteEventType';
import { createEventTypeMiddleware } from '../middlewares/validators/Event/createEventType';

const eventRouter = Router();

eventRouter.post(
  '/event',
  [verifyToken, createEventMiddleware],
  async (req: Request, res: Response) => {
    return createEventController.handle(req, res);
  },
);

// eventRouter.post(
//   '/event/img',
//   [verifyToken, createPartyMiddleware],
//   async (req: Request, res: Response) => {
//     return createPartyController.handle(req, res);
//   },
// );

eventRouter.get('/event', verifyToken, async (req: Request, res: Response) => {
  return findEventIndexController.handle(req, res);
});

eventRouter.get(
  '/event/location',
  [verifyToken, findEventByLocationMiddleware],
  async (req: Request, res: Response) => {
    return findEventByLocationController.handle(req, res);
  },
);

eventRouter.get(
  '/event/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return findEventByIdController.handle(req, res);
  },
);

eventRouter.put(
  '/event',
  [verifyToken, updateEventMiddleware],
  async (req: Request, res: Response) => {
    return updateEventController.handle(req, res);
  },
);

eventRouter.put(
  '/event/actived',
  [verifyToken, updateEventActivedMiddleware],
  async (req: Request, res: Response) => {
    return updateEventActivedController.handle(req, res);
  },
);

eventRouter.delete(
  '/event/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteEventController.handle(req, res);
  },
);

eventRouter.post(
  '/event/type',
  [verifyToken, createEventTypeMiddleware],
  async (req: Request, res: Response) => {
    return createEventTypeController.handle(req, res);
  },
);

eventRouter.post(
  '/event/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteEventTypeController.handle(req, res);
  },
);

export { eventRouter };
