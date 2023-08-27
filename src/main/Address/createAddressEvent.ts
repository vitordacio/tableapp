import { CreateAddressEventController } from '@controllers/Address/CreateAddressEventController';

function CreateAddressEventControllerFactory() {
  const createAddressEventController = new CreateAddressEventController();

  return createAddressEventController;
}

const createAddressEventController = CreateAddressEventControllerFactory();

export { createAddressEventController };
