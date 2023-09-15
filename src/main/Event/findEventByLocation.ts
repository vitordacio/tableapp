import { FindEventByLocationController } from '@controllers/Event/FindEventByLocationController';

function FindEventByLocationControllerFactory() {
  const findEventByLocationController = new FindEventByLocationController();

  return findEventByLocationController;
}

const findEventByLocationController = FindEventByLocationControllerFactory();

export { findEventByLocationController };
