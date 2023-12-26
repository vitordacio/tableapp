import { CreateReactEventController } from '@controllers/React/CreateReactEventController';

function CreateReactEventControllerFactory() {
  const createReactEventController = new CreateReactEventController();

  return createReactEventController;
}

const createReactEventController = CreateReactEventControllerFactory();

export { createReactEventController };
