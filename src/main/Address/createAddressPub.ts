import { CreateAddressPubController } from '@controllers/Address/CreateAddressPubController';

function CreateAddressPubControllerFactory() {
  const createAddressPubController = new CreateAddressPubController();

  return createAddressPubController;
}

const createAddressPubController = CreateAddressPubControllerFactory();

export { createAddressPubController };
