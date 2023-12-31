import { FindReactsByUserIdController } from '@controllers/React/FindReactsByUserIdController';

function FindReactsByUserIdControllerFactory() {
  const findReactsByUserIdController = new FindReactsByUserIdController();

  return findReactsByUserIdController;
}

const findReactsByUserIdController = FindReactsByUserIdControllerFactory();

export { findReactsByUserIdController };
