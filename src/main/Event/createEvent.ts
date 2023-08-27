import { CreateEventController } from '@controllers/Event/CreateEventController';

function CreateEventControllerFactory() {
  const createEventController = new CreateEventController();

  return createEventController;
}

const createEventController = CreateEventControllerFactory();

export { createEventController };
