import { CreateBlockController } from '@controllers/Block/CreateBlockController';

function CreateBlockControllerFactory() {
  const createBlockController = new CreateBlockController();

  return createBlockController;
}

const createBlockController = CreateBlockControllerFactory();

export { createBlockController };
