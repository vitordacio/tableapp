import { UpdateEventActivedController } from '@controllers/Event/UpdateEventActivedController';

function UpdateEventActivedControllerFactory() {
  const updateEventActivedController = new UpdateEventActivedController();

  return updateEventActivedController;
}

const updateEventActivedController = UpdateEventActivedControllerFactory();

export { updateEventActivedController };
