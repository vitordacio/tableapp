import { UpdateEventLocationController } from '@controllers/Event/UpdateEventLocationController';

function UpdateEventLocationControllerFactory() {
  const updateEventLocationController = new UpdateEventLocationController();

  return updateEventLocationController;
}

const updateEventLocationController = UpdateEventLocationControllerFactory();

export { updateEventLocationController };
