import { DeleteEventTypeController } from '@controllers/Event/DeleteEventTypeController';

function DeleteEventTypeControllerFactory() {
  const deleteEventTypeController = new DeleteEventTypeController();

  return deleteEventTypeController;
}

const deleteEventTypeController = DeleteEventTypeControllerFactory();

export { deleteEventTypeController };
