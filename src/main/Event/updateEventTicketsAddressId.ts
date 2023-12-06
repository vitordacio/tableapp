import { UpdateEventAddressIdController } from '@controllers/Event/UpdateEventAddressIdController';

function UpdateEventAddressIdControllerFactory() {
  const updateEventAddressIdController = new UpdateEventAddressIdController();

  return updateEventAddressIdController;
}

const updateEventAddressIdController = UpdateEventAddressIdControllerFactory();

export { updateEventAddressIdController };
