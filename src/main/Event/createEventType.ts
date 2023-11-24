import { CreateEventTypeController } from '@controllers/Event/CreateEventTypeController';

function CreateEventTypeControllerFactory() {
  const createEventTypeController = new CreateEventTypeController();

  return createEventTypeController;
}

const createEventTypeController = CreateEventTypeControllerFactory();

export { createEventTypeController };
