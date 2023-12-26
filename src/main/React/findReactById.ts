import { FindReactByIdController } from '@controllers/React/FindReactByIdController';

function FindReactByIdControllerFactory() {
  const findReactByIdController = new FindReactByIdController();

  return findReactByIdController;
}

const findReactByIdController = FindReactByIdControllerFactory();

export { findReactByIdController };
