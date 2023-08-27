import { CreateRequestController } from '@controllers/Participation/CreateRequestController';

function createRequestControllerFactory() {
  const createRequestController = new CreateRequestController();

  return createRequestController;
}

const createRequestController = createRequestControllerFactory();

export { createRequestController };
