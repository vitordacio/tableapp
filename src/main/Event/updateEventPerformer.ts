import { UpdateEventPerformerController } from '@controllers/Event/UpdateEventPerformerController';

function UpdateEventPerformerControllerFactory() {
  const updateEventPerformerController = new UpdateEventPerformerController();

  return updateEventPerformerController;
}

const updateEventPerformerController = UpdateEventPerformerControllerFactory();

export { updateEventPerformerController };
