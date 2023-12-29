import { FindBlockController } from '@controllers/Block/FindBlockController';

function FindBlockControllerFactory() {
  const findBlockController = new FindBlockController();

  return findBlockController;
}

const findBlockController = FindBlockControllerFactory();

export { findBlockController };
