import { FindMomentsByEventController } from '@controllers/Moment/FindMomentsByEventController';

function FindMomentsByEventControllerFactory() {
  const findMomentsByEventController = new FindMomentsByEventController();

  return findMomentsByEventController;
}

const findMomentsByEventController = FindMomentsByEventControllerFactory();

export { findMomentsByEventController };
