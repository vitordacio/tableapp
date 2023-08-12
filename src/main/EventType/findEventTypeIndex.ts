import { FindEventTypeIndexController } from '@controllers/EventType/FindEventTypeIndexController';

function FindEventTypeIndexControllerFactory() {
  const findEventTypeIndexController = new FindEventTypeIndexController();

  return findEventTypeIndexController;
}

const findEventTypeIndexController = FindEventTypeIndexControllerFactory();

export { findEventTypeIndexController };
