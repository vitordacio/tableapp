import { FindEventIndexController } from '@controllers/Event/FindEventIndexController';

function FindEventIndexControllerFactory() {
  const findEventIndexController = new FindEventIndexController();

  return findEventIndexController;
}

const findEventIndexController = FindEventIndexControllerFactory();

export { findEventIndexController };
