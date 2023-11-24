import { FindEventTypesController } from '@controllers/Types/EventType/FindEventTypesController';

function FindEventTypesControllerFactory() {
  const findEventTypesController = new FindEventTypesController();

  return findEventTypesController;
}

const findEventTypesController = FindEventTypesControllerFactory();

export { findEventTypesController };
