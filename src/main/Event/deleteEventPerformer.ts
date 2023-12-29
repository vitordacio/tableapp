import { DeleteEventPerformerController } from '@controllers/Event/DeleteEventPerformerController';

function DeleteEventPerformerControllerFactory() {
  const deleteEventPerformerController = new DeleteEventPerformerController();

  return deleteEventPerformerController;
}

const deleteEventPerformerController = DeleteEventPerformerControllerFactory();

export { deleteEventPerformerController };
