import { UpdateEventHoursController } from '@controllers/Event/UpdateEventHoursController';

function UpdateEventHoursControllerFactory() {
  const updateEventHoursController = new UpdateEventHoursController();

  return updateEventHoursController;
}

const updateEventHoursController = UpdateEventHoursControllerFactory();

export { updateEventHoursController };
