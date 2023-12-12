import { FindEventsByUserIdController } from '@controllers/Event/FindEventsByUserIdController';

function FindEventsByUserIdControllerFactory() {
  const findEventsByUserIdController = new FindEventsByUserIdController();

  return findEventsByUserIdController;
}

const findEventsByUserIdController = FindEventsByUserIdControllerFactory();

export { findEventsByUserIdController };
