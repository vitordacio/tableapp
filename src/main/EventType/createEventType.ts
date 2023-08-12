import { CreateEventTypeController } from '@controllers/EventType/CreateEventTypeController';

function CreateEventTypeControllerFactory() {
  const createEventTypeController = new CreateEventTypeController();

  return createEventTypeController;
}

const createEventTypeController = CreateEventTypeControllerFactory();

export { createEventTypeController };
