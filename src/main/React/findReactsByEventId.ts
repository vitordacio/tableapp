import { FindReactsByEventIdController } from '@controllers/React/FindReactsByEventIdController';

function FindReactsByEventIdControllerFactory() {
  const findReactsByEventIdController = new FindReactsByEventIdController();

  return findReactsByEventIdController;
}

const findReactsByEventIdController = FindReactsByEventIdControllerFactory();

export { findReactsByEventIdController };
