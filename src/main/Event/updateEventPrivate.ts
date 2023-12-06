import { UpdateEventPrivateController } from '@controllers/Event/UpdateEventPrivateController';

function UpdateEventPrivateControllerFactory() {
  const updateEventPrivateController = new UpdateEventPrivateController();

  return updateEventPrivateController;
}

const updateEventPrivateController = UpdateEventPrivateControllerFactory();

export { updateEventPrivateController };
