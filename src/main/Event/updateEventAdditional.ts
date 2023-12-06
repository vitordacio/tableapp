import { UpdateEventAdditionalController } from '@controllers/Event/UpdateEventAdditionalController';

function UpdateEventAdditionalControllerFactory() {
  const updateEventAdditionalController = new UpdateEventAdditionalController();

  return updateEventAdditionalController;
}

const updateEventAdditionalController =
  UpdateEventAdditionalControllerFactory();

export { updateEventAdditionalController };
