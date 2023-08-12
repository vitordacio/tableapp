import { FindEventByIdController } from '@controllers/Event/FindEventByIdController';

function FindEventByIdControllerFactory() {
  const findEventByIdController = new FindEventByIdController();

  return findEventByIdController;
}

const findEventByIdController = FindEventByIdControllerFactory();

export { findEventByIdController };
