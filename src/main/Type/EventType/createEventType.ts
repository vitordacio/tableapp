import { CreateEventTypeController } from '@controllers/Types/EventType/CreateEventTypeController';

function CreateEventTypeControllerFactory() {
  const createEventTypeController = new CreateEventTypeController();

  return createEventTypeController;
}

const createEventTypeController = CreateEventTypeControllerFactory();

export { createEventTypeController };
