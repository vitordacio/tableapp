import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

import { createTypeMiddleware } from '../middlewares/validators/Type/createType';
import { createTableMiddleware } from '../middlewares/validators/Event/createTable';

import { createEventTypeController } from '../main/EventType/createEventType';
import { findEventTypeIndexController } from '../main/EventType/findEventTypeIndex';
import { deleteEventTypeController } from '../main/EventType/deleteEventType';

import { findEventIndexController } from '../main/Event/findEventIndex';
import { findEventByIdController } from '../main/Event/findEventById';
import { createTableController } from '../main/Event/Table/createTable';
import { deleteTableController } from '../main/Event/Table/deleteTable';
import { findTableIndexController } from '../main/Event/Table/findTableIndex';

const eventRouter = Router();

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

eventRouter.post(
  '/table',
  [verifyToken, createTableMiddleware],
  async (req: Request, res: Response) => {
    return createTableController.handle(req, res);
  },
);

eventRouter.delete(
  '/table/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteTableController.handle(req, res);
  },
);

eventRouter.get('/table', verifyToken, async (req: Request, res: Response) => {
  return findTableIndexController.handle(req, res);
});

eventRouter.post(
  '/event_type',
  [verifyToken, createTypeMiddleware],
  async (req: Request, res: Response) => {
    return createEventTypeController.handle(req, res);
  },
);

eventRouter.get(
  '/event_type',
  verifyToken,
  async (req: Request, res: Response) => {
    return findEventTypeIndexController.handle(req, res);
  },
);

eventRouter.delete(
  '/event_type/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteEventTypeController.handle(req, res);
  },
);

// EventRouter.put(
//   '/user',
//   [verifyToken, updateUserMiddleware],
//   async (req: Request, res: Response) => {
//     return updateUserController.handle(req, res);
//   },
// );

export { eventRouter };
