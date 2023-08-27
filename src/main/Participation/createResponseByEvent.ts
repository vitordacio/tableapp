import { CreateResponseByEventController } from '@controllers/Participation/CreateResponseByEventController';

function createResponseByEventControllerFactory() {
  const createResponseByEventController = new CreateResponseByEventController();

  return createResponseByEventController;
}

const createResponseByEventController =
  createResponseByEventControllerFactory();

export { createResponseByEventController };
