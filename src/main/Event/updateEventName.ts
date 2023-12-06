import { UpdateEventNameController } from '@controllers/Event/UpdateEventNameController';

function UpdateEventNameControllerFactory() {
  const updateEventNameController = new UpdateEventNameController();

  return updateEventNameController;
}

const updateEventNameController = UpdateEventNameControllerFactory();

export { updateEventNameController };
