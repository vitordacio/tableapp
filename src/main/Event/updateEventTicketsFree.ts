import { UpdateEventTicketsFreeController } from '@controllers/Event/UpdateEventTicketsFreeController';

function UpdateEventTicketsFreeControllerFactory() {
  const updateEventTicketsFreeController =
    new UpdateEventTicketsFreeController();

  return updateEventTicketsFreeController;
}

const updateEventTicketsFreeController =
  UpdateEventTicketsFreeControllerFactory();

export { updateEventTicketsFreeController };
