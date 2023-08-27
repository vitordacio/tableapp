import { CreateRequestController } from '@controllers/Friendship/CreateRequestController';

function createRequestControllerFactory() {
  const createRequestController = new CreateRequestController();

  return createRequestController;
}

const createRequestController = createRequestControllerFactory();

export { createRequestController };
