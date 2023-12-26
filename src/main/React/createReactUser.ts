import { CreateReactUserController } from '@controllers/React/CreateReactUserController';

function CreateReactUserControllerFactory() {
  const createReactUserController = new CreateReactUserController();

  return createReactUserController;
}

const createReactUserController = CreateReactUserControllerFactory();

export { createReactUserController };
