import { CreateResponseController } from '@controllers/Friendship/CreateResponseController';

function createResponseControllerFactory() {
  const createResponseController = new CreateResponseController();

  return createResponseController;
}

const createResponseController = createResponseControllerFactory();

export { createResponseController };
