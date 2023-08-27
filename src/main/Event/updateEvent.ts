import { UpdateEventController } from '@controllers/Event/UpdateEventController';

function UpdateEventControllerFactory() {
  const updateEventController = new UpdateEventController();

  return updateEventController;
}

const updateEventController = UpdateEventControllerFactory();

export { updateEventController };
