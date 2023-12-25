import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

import { findEventIndexController } from '../main/Event/findEventIndex';
import { findEventByIdController } from '../main/Event/findEventById';
import { createEventController } from '../main/Event/createEvent';
import { deleteEventController } from '../main/Event/deleteEvent';

import { updateEventLocationMiddleware } from '../middlewares/validators/Event/updateEventLocation';
import { updateEventLocationController } from '../main/Event/updateEventLocation';
import { findEventByLocationMiddleware } from '../middlewares/validators/Event/findEventByLocation';
import { findEventByLocationController } from '../main/Event/findEventByLocation';
import { createEventMiddleware } from '../middlewares/validators/Event/createEvent';
import { updateEventNameController } from '../main/Event/updateEventName';
import { updateEventNameMiddleware } from '../middlewares/validators/Event/updateEventName';
import { findEventsByNameMiddleware } from '../middlewares/validators/Event/findEventsByName';
import { findEventsByNameController } from '../main/Event/findEventsByName';
import { findEventsByUserIdMiddleware } from '../middlewares/validators/Event/findEventsByUserId';
import { findEventsByUserIdController } from '../main/Event/findEventsByUserId';
import { updateEventAdditionalController } from '../main/Event/updateEventAdditional';
import { updateEventClubNameController } from '../main/Event/updateEventClubName';
import { updateEventDrinkPreferencesController } from '../main/Event/updateEventDrinkPreferences';
import { updateEventHoursController } from '../main/Event/updateEventHours';
import { updateEventMinAmountController } from '../main/Event/updateEventMinAmount';
import { updateEventPerformerController } from '../main/Event/updateEventPerformer';
import { updateEventPrivateController } from '../main/Event/updateEventPrivate';
import { updateEventAddressIdController } from '../main/Event/updateEventTicketsAddressId';
import { updateEventTicketsFreeController } from '../main/Event/updateEventTicketsFree';
import { updateEventTicketsValueController } from '../main/Event/updateEventTicketsValue';
import { updateEventAdditionalMiddleware } from '../middlewares/validators/Event/updateEventAdditional';
import { updateEventAddressIdMiddleware } from '../middlewares/validators/Event/updateEventAddressId';
import { updateEventClubNameMiddleware } from '../middlewares/validators/Event/updateEventClubName';
import { updateEventDrinkPreferencesMiddleware } from '../middlewares/validators/Event/updateEventDrinkPreferences';
import { updateEventHoursMiddleware } from '../middlewares/validators/Event/updateEventHours';
import { updateEventMinAmountMiddleware } from '../middlewares/validators/Event/updateEventMinAmount';
import { updateEventPerformerMiddleware } from '../middlewares/validators/Event/updateEventPerformer';
import { updateEventPrivateMiddleware } from '../middlewares/validators/Event/updateEventPrivate';
import { updateEventTicketsFreeMiddleware } from '../middlewares/validators/Event/updateEventTicketsFree';
import { updateEventTicketsValueMiddleware } from '../middlewares/validators/Event/updateEventTicketsValue';
import {
  verifyParamEventId,
  verifyParamUserId,
} from '../middlewares/verifyParamId';

const eventRouter = Router();

eventRouter.post(
  '/event',
  [verifyToken, createEventMiddleware],
  async (req: Request, res: Response) => {
    return createEventController.handle(req, res);
  },
);

eventRouter.get(
  '/event/search',
  [verifyToken, findEventsByNameMiddleware],
  async (req: Request, res: Response) => {
    return findEventsByNameController.handle(req, res);
  },
);

eventRouter.get(
  '/event/user/:user_id',
  [verifyToken, verifyParamUserId, findEventsByUserIdMiddleware],
  async (req: Request, res: Response) => {
    return findEventsByUserIdController.handle(req, res);
  },
);

eventRouter.get('/event', verifyToken, async (req: Request, res: Response) => {
  return findEventIndexController.handle(req, res);
});

// TO DO
eventRouter.get(
  '/event/location',
  [verifyToken, findEventByLocationMiddleware],
  async (req: Request, res: Response) => {
    return findEventByLocationController.handle(req, res);
  },
);

eventRouter.get(
  '/event/:event_id',
  [verifyToken, verifyParamEventId],
  async (req: Request, res: Response) => {
    return findEventByIdController.handle(req, res);
  },
);

eventRouter.put(
  '/event/name',
  [verifyToken, updateEventNameMiddleware],
  async (req: Request, res: Response) => {
    return updateEventNameController.handle(req, res);
  },
);

eventRouter.put(
  '/event/location',
  [verifyToken, updateEventLocationMiddleware],
  async (req: Request, res: Response) => {
    return updateEventLocationController.handle(req, res);
  },
);

eventRouter.put(
  '/event/hours',
  [verifyToken, updateEventHoursMiddleware],
  async (req: Request, res: Response) => {
    return updateEventHoursController.handle(req, res);
  },
);

eventRouter.put(
  '/event/private',
  [verifyToken, updateEventPrivateMiddleware],
  async (req: Request, res: Response) => {
    return updateEventPrivateController.handle(req, res);
  },
);

eventRouter.put(
  '/event/additional',
  [verifyToken, updateEventAdditionalMiddleware],
  async (req: Request, res: Response) => {
    return updateEventAdditionalController.handle(req, res);
  },
);

eventRouter.put(
  '/event/drink_preferences',
  [verifyToken, updateEventDrinkPreferencesMiddleware],
  async (req: Request, res: Response) => {
    return updateEventDrinkPreferencesController.handle(req, res);
  },
);

eventRouter.put(
  '/event/min_amount',
  [verifyToken, updateEventMinAmountMiddleware],
  async (req: Request, res: Response) => {
    return updateEventMinAmountController.handle(req, res);
  },
);

eventRouter.put(
  '/event/performer',
  [verifyToken, updateEventPerformerMiddleware],
  async (req: Request, res: Response) => {
    return updateEventPerformerController.handle(req, res);
  },
);

eventRouter.put(
  '/event/club_name',
  [verifyToken, updateEventClubNameMiddleware],
  async (req: Request, res: Response) => {
    return updateEventClubNameController.handle(req, res);
  },
);

eventRouter.put(
  '/event/tickets_value',
  [verifyToken, updateEventTicketsValueMiddleware],
  async (req: Request, res: Response) => {
    return updateEventTicketsValueController.handle(req, res);
  },
);

eventRouter.put(
  '/event/tickets_free',
  [verifyToken, updateEventTicketsFreeMiddleware],
  async (req: Request, res: Response) => {
    return updateEventTicketsFreeController.handle(req, res);
  },
);

eventRouter.put(
  '/event/address',
  [verifyToken, updateEventAddressIdMiddleware],
  async (req: Request, res: Response) => {
    return updateEventAddressIdController.handle(req, res);
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
