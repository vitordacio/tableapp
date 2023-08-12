import { DeleteEventTypeController } from '@controllers/EventType/DeleteEventTypeController';

function DeleteEventTypeControllerFactory() {
  const deleteEventTypeController = new DeleteEventTypeController();

  return deleteEventTypeController;
}

const deleteEventTypeController = DeleteEventTypeControllerFactory();

export { deleteEventTypeController };
