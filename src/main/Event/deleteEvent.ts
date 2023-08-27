import { DeleteEventController } from '@controllers/Event/DeleteEventController';

function DeleteEventControllerFactory() {
  const deleteEventController = new DeleteEventController();

  return deleteEventController;
}

const deleteEventController = DeleteEventControllerFactory();

export { deleteEventController };
