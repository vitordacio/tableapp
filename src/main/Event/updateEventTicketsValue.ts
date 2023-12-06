import { UpdateEventTicketsValueController } from '@controllers/Event/UpdateEventTicketsValueController';

function UpdateEventTicketsValueControllerFactory() {
  const updateEventTicketsValueController =
    new UpdateEventTicketsValueController();

  return updateEventTicketsValueController;
}

const updateEventTicketsValueController =
  UpdateEventTicketsValueControllerFactory();

export { updateEventTicketsValueController };
