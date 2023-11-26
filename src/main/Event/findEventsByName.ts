import { FindEventsByNameController } from '@controllers/Event/FindEventsByNameController';

function FindEventsByNameControllerFactory() {
  const findEventsByNameController = new FindEventsByNameController();

  return findEventsByNameController;
}

const findEventsByNameController = FindEventsByNameControllerFactory();

export { findEventsByNameController };
